import React, { useState } from 'react';
import { BookingRequest } from '../types';
import { CheckCircle, AlertCircle } from 'lucide-react';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingRequest>({
    name: '',
    email: '',
    date: '',
    guestCount: 2,
    occasion: '',
    allergies: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingRequest, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof BookingRequest]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingRequest, string>> = {};
    let isValid = true;

    // Validate Guest Count
    if (formData.guestCount < 1 || !Number.isInteger(Number(formData.guestCount))) {
      newErrors.guestCount = "Guest count must be a positive whole number.";
      isValid = false;
    }

    // Validate Date
    if (!formData.date) {
      newErrors.date = "Please select a date.";
      isValid = false;
    } else {
      // Create date objects for comparison (stripping time to compare dates only)
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Parse input date string (YYYY-MM-DD) as local time
      const [year, month, day] = formData.date.split('-').map(Number);
      const selectedDate = new Date(year, month - 1, day);

      if (selectedDate < today) {
        newErrors.date = "Date cannot be in the past.";
        isValid = false;
      }
    }

    // Basic validation for required fields (HTML5 handles this, but good to double check)
    if (!formData.name.trim()) {
        newErrors.name = "Name is required.";
        isValid = false;
    }
    if (!formData.email.trim()) {
        newErrors.email = "Email is required.";
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // Simulate API call
      console.log("Booking Request:", formData);
      setTimeout(() => {
          setSubmitted(true);
      }, 1000);
    }
  };

  // Get today's date string for min attribute
  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <section id="contact" className="py-32 bg-white dark:bg-nimah-black transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="font-sans uppercase text-nimah-red tracking-[0.3em] text-xs font-bold">Concierge Service</span>
          <h2 className="font-serif text-5xl md:text-6xl text-nimah-black dark:text-nimah-cream mt-6 mb-8">Request Hosting</h2>
          <p className="font-sans text-nimah-olive dark:text-nimah-rose/80 max-w-xl mx-auto leading-relaxed">
            Experience the luxury of being a guest at your own event. From menu curation to table setting, 
            allow me to handle the details while you enjoy the company.
          </p>
        </div>

        <div className="bg-nimah-paper dark:bg-white/5 p-10 md:p-16 border border-nimah-rose/10 dark:border-nimah-cream/10 shadow-2xl">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in-up">
              <CheckCircle size={64} className="text-nimah-olive mb-8" />
              <h3 className="font-serif text-4xl text-nimah-black dark:text-white mb-6">Request Received</h3>
              <p className="text-nimah-black/70 dark:text-nimah-cream/80 max-w-md mb-8">
                Thank you, {formData.name}. I have received your details. I will review the date and theme, and reach out to your email ({formData.email}) shortly to discuss the finer details.
              </p>
              <button 
                onClick={() => { setSubmitted(false); setFormData({...formData, date: '', occasion: '', allergies: ''}); }}
                className="text-nimah-red hover:text-nimah-rose font-sans uppercase tracking-widest text-xs border-b border-nimah-red pb-1"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Name */}
                <div className="space-y-3 group">
                  <label htmlFor="name" className="block text-xs font-sans uppercase tracking-[0.2em] text-nimah-olive dark:text-nimah-rose group-focus-within:text-nimah-red transition-colors">Full Name</label>
                  <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b outline-none py-2 transition-all text-nimah-black dark:text-nimah-cream placeholder:text-nimah-black/20 ${errors.name ? 'border-nimah-red' : 'border-nimah-black/20 dark:border-nimah-cream/20 focus:border-nimah-red dark:focus:border-nimah-rose'}`}
                    placeholder="Jane Doe"
                  />
                  {errors.name && <p className="text-nimah-red text-xs flex items-center gap-1 mt-1"><AlertCircle size={12}/> {errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-3 group">
                  <label htmlFor="email" className="block text-xs font-sans uppercase tracking-[0.2em] text-nimah-olive dark:text-nimah-rose group-focus-within:text-nimah-red transition-colors">Email Address</label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b outline-none py-2 transition-all text-nimah-black dark:text-nimah-cream placeholder:text-nimah-black/20 ${errors.email ? 'border-nimah-red' : 'border-nimah-black/20 dark:border-nimah-cream/20 focus:border-nimah-red dark:focus:border-nimah-rose'}`}
                    placeholder="jane@example.com"
                  />
                  {errors.email && <p className="text-nimah-red text-xs flex items-center gap-1 mt-1"><AlertCircle size={12}/> {errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Date */}
                <div className="space-y-3 group">
                  <label htmlFor="date" className="block text-xs font-sans uppercase tracking-[0.2em] text-nimah-olive dark:text-nimah-rose group-focus-within:text-nimah-red transition-colors">Preferred Date</label>
                  <input
                    required
                    type="date"
                    id="date"
                    name="date"
                    min={getTodayString()}
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b outline-none py-2 transition-all text-nimah-black dark:text-nimah-cream ${errors.date ? 'border-nimah-red' : 'border-nimah-black/20 dark:border-nimah-cream/20 focus:border-nimah-red dark:focus:border-nimah-rose'}`}
                  />
                   {errors.date && <p className="text-nimah-red text-xs flex items-center gap-1 mt-1"><AlertCircle size={12}/> {errors.date}</p>}
                </div>

                {/* Guest Count */}
                <div className="space-y-3 group">
                  <label htmlFor="guestCount" className="block text-xs font-sans uppercase tracking-[0.2em] text-nimah-olive dark:text-nimah-rose group-focus-within:text-nimah-red transition-colors">Number of Guests</label>
                  <input
                    required
                    type="number"
                    min="1"
                    id="guestCount"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b outline-none py-2 transition-all text-nimah-black dark:text-nimah-cream ${errors.guestCount ? 'border-nimah-red' : 'border-nimah-black/20 dark:border-nimah-cream/20 focus:border-nimah-red dark:focus:border-nimah-rose'}`}
                  />
                   {errors.guestCount && <p className="text-nimah-red text-xs flex items-center gap-1 mt-1"><AlertCircle size={12}/> {errors.guestCount}</p>}
                </div>
              </div>

              {/* Occasion */}
               <div className="space-y-3 group">
                  <label htmlFor="occasion" className="block text-xs font-sans uppercase tracking-[0.2em] text-nimah-olive dark:text-nimah-rose group-focus-within:text-nimah-red transition-colors">Occasion / Theme Idea</label>
                  <input
                    type="text"
                    id="occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    placeholder="Birthday Dinner, Summer Solstice..."
                    className="w-full bg-transparent border-b border-nimah-black/20 dark:border-nimah-cream/20 focus:border-nimah-red dark:focus:border-nimah-rose outline-none py-2 transition-all text-nimah-black dark:text-nimah-cream placeholder:text-nimah-black/20"
                  />
                </div>

              {/* Allergies */}
              <div className="space-y-3 group">
                <label htmlFor="allergies" className="block text-xs font-sans uppercase tracking-[0.2em] text-nimah-olive dark:text-nimah-rose group-focus-within:text-nimah-red transition-colors">Dietary Restrictions & Allergies</label>
                <textarea
                  id="allergies"
                  name="allergies"
                  rows={4}
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="Please list any allergies (e.g., Peanuts, Shellfish) or restrictions..."
                  className="w-full bg-transparent border border-nimah-black/20 dark:border-nimah-cream/20 focus:border-nimah-red dark:focus:border-nimah-rose outline-none p-4 transition-all text-nimah-black dark:text-nimah-cream placeholder:text-nimah-black/20 resize-none"
                ></textarea>
              </div>

              <div className="pt-8 text-center">
                <button
                  type="submit"
                  className="px-16 py-5 bg-nimah-red text-nimah-cream font-sans uppercase tracking-[0.25em] text-xs hover:bg-nimah-black transition-all duration-500 w-full md:w-auto shadow-xl"
                >
                  Submit Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingForm;