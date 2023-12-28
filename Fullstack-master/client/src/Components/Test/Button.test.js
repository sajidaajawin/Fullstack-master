import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Otp from './Otp';

jest.mock('axios');

describe('Otp Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Otp component', () => {
    render(<Otp />);
    expect(screen.getByText('Email Verification')).toBeInTheDocument();
    expect(screen.getByText("We have sent a code to your email ba**@dipainhouse.com")).toBeInTheDocument();
  });

  test('handles verification successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: 'success' });

    render(<Otp />);
    const verifyButton = screen.getByText('Verify Account');
    fireEvent.click(verifyButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/verificationCode', { verificationCode: ['', '', '', '', '', ''] });
    });
  });

  test('handles verification failure', async () => {
    axios.post.mockRejectedValueOnce({ response: { data: { errors: 'Invalid OTP' } } });

    render(<Otp />);
    const verifyButton = screen.getByText('Verify Account');
    fireEvent.click(verifyButton);
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/verificationCode', { verificationCode: ['', '', '', '', '', ''] });
      expect(screen.getByText('Invalid OTP. Please try again.')).toBeInTheDocument();
    });
  });

});
