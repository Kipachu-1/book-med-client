import { render, screen, fireEvent } from "@testing-library/react";
import Login from "@/components/forms/authorization/login";
import { UserAPI } from "@/api";
import { act } from "react";

// Mock the API
jest.mock("@/api", () => ({
  UserAPI: {
    login: jest.fn(),
  },
}));

describe("Login component", () => {
  const mockOnSignUp = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock history before each test
  });

  it("should render login form", () => {
    render(<Login onSignUp={mockOnSignUp} />);

    expect(screen.getByText("Log In", { selector: "h1" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("should submit form and call login API", async () => {
    (UserAPI.login as jest.Mock).mockResolvedValueOnce({});

    render(<Login onSignUp={mockOnSignUp} />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /log in/i }));
    });

    expect(UserAPI.login).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
    expect(screen.queryByText(/login failed/i)).not.toBeInTheDocument();
  });

  it("should display error when login fails", async () => {
    (UserAPI.login as jest.Mock).mockRejectedValueOnce(
      new Error("Login failed")
    );

    render(<Login onSignUp={mockOnSignUp} />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /log in/i }));
    });

    expect(screen.getByText(/login failed/i)).toBeInTheDocument();
  });

  it("should call onSignUp when 'Sign up' button is clicked", () => {
    render(<Login onSignUp={mockOnSignUp} />);

    // Click the sign-up button
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(mockOnSignUp).toHaveBeenCalled();
  });
});
