'use client';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    full_name: '',
    email_address: '',
    business_name: '',
    current_presence: '',
    marketing_needs: '',
    budget: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Form submitted successfully!');
        setFormData({
          full_name: '',
          email_address: '',
          business_name: '',
          current_presence: '',
          marketing_needs: '',
          budget: '',
        });
      } else {
        const errorData = await response.json();
        setStatus(`Submission failed: ${errorData.message}`);
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Digital Marketing Request</h1>
      {status && <p style={{ fontWeight: 'bold' }}>{status}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
        <input name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Full Name" required />
        <input name="email_address" type="email" value={formData.email_address} onChange={handleChange} placeholder="Email Address" required />
        <input name="business_name" value={formData.business_name} onChange={handleChange} placeholder="Business Name" required />
        <input name="current_presence" value={formData.current_presence} onChange={handleChange} placeholder="Website/Social Media Link" type="url" />
        <textarea name="marketing_needs" value={formData.marketing_needs} onChange={handleChange} placeholder="Describe Your Marketing Needs" required />
        <input name="budget" value={formData.budget} onChange={handleChange} placeholder="Estimated Monthly Marketing Budget" />
        <button type="submit">Submit Request</button>
      </form>
    </main>
  );
}