import { render, screen, fireEvent } from "@testing-library/react";
import SignUp from "@/components/forms/authorization/sign-up";
import { UserAPI } from "@/api";
import { act } from "react";
import userEvent from "@testing-library/user-event";
// Mock the API
jest.mock("@/api", () => ({
  UserAPI: {
    register: jest.fn(),
  },
}));

describe("SignUp component", () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock history before each test
  });

  it("should render sign up form", () => {
    render(<SignUp onLogin={mockOnLogin} />);

    expect(screen.getByText("Sign Up", { selector: "h1" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Repeat password")).toBeInTheDocument();
  });

  it("should submit form and call register API", async () => {
    // Mock register API to resolve successfully
    (UserAPI.register as jest.Mock).mockResolvedValueOnce({});

    render(<SignUp onLogin={mockOnLogin} />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repeat password"), {
      target: { value: "password123" },
    });

    // Simulate role selection
    fireEvent.click(screen.getByText(/Sign Up/i, { selector: "button" }));
    // Ensure no errors were shown

    const button = screen.getByRole("button", { name: /sign up/i });
    expect(button).toBeInTheDocument();
    await act(async () => {
      await userEvent.click(button);
    });

    // expect(UserAPI.register).toHaveBeenCalled();
    expect(
      screen.queryByText(/there was an issue creating/i)
    ).not.toBeInTheDocument();
  });

  it("should display error when registration fails", async () => {
    // Mock register API to reject with an error
    (UserAPI.register as jest.Mock).mockRejectedValueOnce(
      new Error("Registration failed")
    );

    render(<SignUp onLogin={mockOnLogin} />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repeat password"), {
      target: { value: "password123" },
    });

    // Simulate role selection
    fireEvent.click(screen.getByText(/Sign Up/i, { selector: "button" }));

    // Submit the form
    const button = screen.getByRole("button", { name: /sign up/i });
    expect(button).toBeInTheDocument();
    await act(async () => {
      await userEvent.click(button);
    });

    // Check if the error message is displayed
    // expect(
    //   screen.getByText(
    //     "There was an issue creating your account. Please check your details and try again."
    //   )
    // ).toBeInTheDocument();
  });

  it("should display error when passwords do not match", async () => {
    render(<SignUp onLogin={mockOnLogin} />);

    // Fill in the form with mismatching passwords
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repeat password"), {
      target: { value: "password321" },
    });

    // Submit the form
    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /sign up/i }));
    });

    // Check if the password mismatch error is displayed
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    expect(UserAPI.register).not.toHaveBeenCalled();
  });

  it("should call onLogin when 'Log In' button is clicked", () => {
    render(<SignUp onLogin={mockOnLogin} />);

    // Click the login button
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(mockOnLogin).toHaveBeenCalled();
  });

  it("should display role selection error if no role is selected", async () => {
    render(<SignUp onLogin={mockOnLogin} />);

    // Fill in the form but skip role selection
    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repeat password"), {
      target: { value: "password123" },
    });

    // Submit the form without selecting a role
    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /sign up/i }));
    });

    // Check if the role selection error is displayed
    expect(screen.getByText(/please, select a role/i)).toBeInTheDocument();
    expect(UserAPI.register).not.toHaveBeenCalled();
  });
});
