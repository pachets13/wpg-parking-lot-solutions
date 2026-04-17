import { useState } from 'react'

// Replace with your actual Formspree form ID from formspree.io
// Steps: sign up → New Form → copy the ID from the endpoint URL
const FORMSPREE_ID = 'YOUR_FORM_ID'

const INITIAL_STATE = {
  name: '',
  company: '',
  phone: '',
  email: '',
  service: '',
  propertyAddress: '',
  message: '',
}

export default function QuoteForm() {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'

  function handleChange(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData(INITIAL_STATE)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success">
        <div className="form-success__icon">✓</div>
        <div className="form-success__message">Quote request received.</div>
        <p className="form-success__sub">
          We'll be in touch within one business day. If you need to reach us sooner,
          call us at <a href="tel:+12047771467" style={{ color: 'var(--color-amber)' }}>(204) 777-1467</a>.
        </p>
      </div>
    )
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit} noValidate data-fade>
      <div className="form-grid">
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-input"
            placeholder="Jane Smith"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Company */}
        <div className="form-group">
          <label htmlFor="company" className="form-label">Company / Property Name *</label>
          <input
            id="company"
            name="company"
            type="text"
            className="form-input"
            placeholder="Winnipeg Plaza Ltd."
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="form-input"
            placeholder="(204) 555-0100"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            placeholder="jane@company.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Service */}
        <div className="form-group form-grid--full">
          <label htmlFor="service" className="form-label">Service You're Interested In *</label>
          <select
            id="service"
            name="service"
            className="form-select"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a service...</option>
            <option value="Concrete & Asphalt">Concrete &amp; Asphalt</option>
            <option value="Snow & Ice Solutions">Snow &amp; Ice Solutions</option>
            <option value="Design Build">Design Build</option>
            <option value="Multiple Services">Multiple Services</option>
            <option value="Not Sure">Not Sure — I'd like to discuss</option>
          </select>
        </div>

        {/* Property address */}
        <div className="form-group form-grid--full">
          <label htmlFor="propertyAddress" className="form-label">Property Address / Location</label>
          <input
            id="propertyAddress"
            name="propertyAddress"
            type="text"
            className="form-input"
            placeholder="123 Main St, Winnipeg, MB"
            value={formData.propertyAddress}
            onChange={handleChange}
          />
        </div>

        {/* Message */}
        <div className="form-group form-grid--full">
          <label htmlFor="message" className="form-label">Project Details</label>
          <textarea
            id="message"
            name="message"
            className="form-textarea"
            placeholder="Tell us about your project — scope, timeline, any specific needs..."
            value={formData.message}
            onChange={handleChange}
            rows={5}
          />
        </div>

        {/* Submit */}
        <div className="form-grid--full">
          <button
            type="submit"
            className="btn btn-primary btn-lg form-submit"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending...' : 'Request a Quote'}
          </button>

          {status === 'error' && (
            <p style={{ color: 'var(--color-error)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-3)', textAlign: 'center' }}>
              Something went wrong. Please try again or email us at{' '}
              <a href="mailto:info@wpgparkinglotsolutions.ca" style={{ color: 'var(--color-amber)' }}>
                info@wpgparkinglotsolutions.ca
              </a>.
            </p>
          )}
        </div>
      </div>
    </form>
  )
}
