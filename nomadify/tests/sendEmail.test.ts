import { mocked } from 'jest-mock';
import { sendEmail } from '../src/utils/utils';
import * as emailjs from 'emailjs-com';
import { EmailJSResponseStatus } from 'emailjs-com';
import { toast } from 'react-hot-toast';

jest.mock('emailjs-com');

jest.mock('../src/utils/db/supabaseConfig', () => ({
  getSupabaseUrl: jest.fn(),
  getSupabaseKey: jest.fn(),
}));

describe('sendEmail', () => {
  it('sends email successfully', async () => {
    const mockEvent: any = {
      preventDefault: jest.fn(),
      target: { reset: jest.fn() },
    };

    // Mock the sendForm function
    mocked(emailjs.sendForm).mockResolvedValueOnce({
      status: 200, // Provide a valid status code
    } as EmailJSResponseStatus);

    // Call the sendEmail function
    await sendEmail(mockEvent);

    // Expectations
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(emailjs.sendForm).toHaveBeenCalledWith(
      'nomadify_contact',
      'template_fnex1n8',
      mockEvent.target,
      'jI57JPoeSeH54Dm4S'
    );
    expect(mockEvent.target.reset).toHaveBeenCalled(); // Ensure the reset is called after the promise is resolved
    expect(toast.success("The email was sent!"));
  });

  it('handles email sending failure', async () => {
    const mockEvent: any = {
      preventDefault: jest.fn(),
    };

    // Mock the sendForm function to simulate an error
    mocked(emailjs.sendForm).mockRejectedValueOnce({ text: 'Error sending email' });

    // Call the sendEmail function
    await sendEmail(mockEvent);

    // Expectations
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(emailjs.sendForm).toHaveBeenCalledWith(
      'nomadify_contact',
      'template_fnex1n8',
      mockEvent.target,
      'jI57JPoeSeH54Dm4S'
    );
    expect(toast.error("The email cannot be send..."));
    expect(console.log("Error sending and email."));
  });
});

