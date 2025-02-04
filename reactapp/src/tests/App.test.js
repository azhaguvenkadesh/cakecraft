import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import axios from "axios";
import CakeForm from "../BakerComponents/CakeForm";
import ViewCake from "../BakerComponents/ViewCake";
import BakerNavbar from "../BakerComponents/BakerNavbar";
import HomePage from "../Components/HomePage";

// Mock axios and react-router-dom
jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useParams: () => ({ id: undefined }),
}));

describe('CakeForm Component', () => {
  const renderCakeForm = () => {
    render(
      <Router>
        <CakeForm />
      </Router>
    );
  };

  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');
    global.URL.revokeObjectURL = jest.fn();
  });
  afterAll(() => {
    global.URL.createObjectURL.mockRestore();
    global.URL.revokeObjectURL.mockRestore();
  });

  test('frontend_cakeform_rendersCreateTitle', () => {
    renderCakeForm();
    expect(screen.getByText('Create New Cake')).toBeInTheDocument();
  });

  test('frontend_cakeform_displaysRequiredFields', () => {
    renderCakeForm();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cake image/i)).toBeInTheDocument();
  });

  test('frontend_cakeform_showsValidationErrors', async () => {
    renderCakeForm();
    const submitButton = screen.getByRole('button', { name: /add cake/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Category is required')).toBeInTheDocument();
      expect(screen.getByText('Price is required')).toBeInTheDocument();
      expect(screen.getByText('Quantity is required')).toBeInTheDocument();
      expect(screen.getByText('Image is required')).toBeInTheDocument();
    });
  });

  test('frontend_cakeform_handlesNewCakeSubmission_navigatesToCakeList', async () => {
    // Mock the API call to resolve after a short delay
    axios.post.mockResolvedValue({ status: 201 });
    renderCakeForm();
    // Fill in form data
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test Cake' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Birthday' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '25.99' } });
    fireEvent.change(screen.getByLabelText(/Quantity/i), { target: { value: '10' } });
    // Mock the cake image file input
    const file = new File(['dummy content'], 'cake.jpg', { type: 'image/jpeg' });
    fireEvent.change(screen.getByLabelText(/Cake Image/i), { target: { files: [file] } });
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Add Cake/i }));
  });
});

// Test Cases for ViewCake Component
describe('ViewCake Component', () => {
  const mockCakes = [
    {
      cakeId: 1,
      name: 'Test Cake',
      category: 'Birthday',
      price: 25.99,
      quantity: 10,
      cakeImage: 'test-image-url'
    }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ status: 200, data: mockCakes });
  });

  const renderViewCake = () => {
    render(
      <Router>
        <ViewCake />
      </Router>
    );
  };

  test('frontend_viewcake_rendersTableCorrectly', async () => {
    renderViewCake();
    await waitFor(() => {
      expect(screen.getByText('Cakes')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Category')).toBeInTheDocument();
    });
  });

  test('frontend_viewcake_displaysApiData', async () => {
    renderViewCake();
    await waitFor(() => {
      expect(screen.getByText('Test Cake')).toBeInTheDocument();
      expect(screen.getByText('Birthday')).toBeInTheDocument();
      expect(screen.getByText('10 kg')).toBeInTheDocument();
      expect(screen.getByText('Rs. 25.99')).toBeInTheDocument();
    });
  });

  test('frontend_viewcake_handlesDeleteConfirmation', async () => {
    renderViewCake();
    await waitFor(() => {
      const deleteButton = screen.getByRole('button', { name: /delete/i });
      fireEvent.click(deleteButton);
      expect(screen.getByText('Are you sure you want to delete this cake?')).toBeInTheDocument();
    });
  });

  test('frontend_viewcake_handlesEmptyState', async () => {
    axios.get.mockResolvedValue({ status: 200, data: [] });
    renderViewCake();
    await waitFor(() => {
      expect(screen.getByText('Oops! No records found')).toBeInTheDocument();
    });
  });
});

// Test Cases for BakerNavbar Component
describe('BakerNavbar Component', () => {
  const renderNavbar = () => {
    render(
      <Router>
        <BakerNavbar />
      </Router>
    );
  };

  test('frontend_navbar_rendersTitle', () => {
    renderNavbar();
    expect(screen.getByText('CakeCraft')).toBeInTheDocument();
  });

  test('frontend_navbar_containsNavigationLinks', () => {
    renderNavbar();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Cake')).toBeInTheDocument();
  });
});

// Test Cases for HomePage Component
describe('HomePage Component', () => {
  const renderHomePage = () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
  };

  test('frontend_homepage_rendersMainContent', () => {
    renderHomePage();
    expect(screen.getByText('CakeCraft', { selector: 'div.title' })).toBeInTheDocument();
    expect(screen.getByText(/Unleash your dessert dreams! Dive into a world of stunning cakes, from festive celebrations to everyday indulgences. Handcrafted with love, each bite is a delight!/)).toBeInTheDocument();
  });

  test('frontend_homepage_displaysContactInfo', () => {
    renderHomePage();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Email: example@example.com')).toBeInTheDocument();
    expect(screen.getByText('Phone: 123-456-7890')).toBeInTheDocument();
  });

  test('frontend_homepage_includesNavigation', () => {
    renderHomePage();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});