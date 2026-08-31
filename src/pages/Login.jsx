import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' }); const [error, setError] = useState(''); const [saving, setSaving] = useState(false); const { login } = useAuth(); const navigate = useNavigate(); const location = useLocation();
  const submit = async (e) => { e.preventDefault(); setSaving(true); setError(''); try { await login(form); navigate(location.state?.from || '/'); } catch (err) { setError(err.message); } finally { setSaving(false); } };
  return <AuthForm title="Welcome back" subtitle="Log in to manage your marketplace listings."><form onSubmit={submit} className="space-y-4"><Input label="Email" type="email" value={form.email} onChange={(email) => setForm({ ...form, email })} /><Input label="Password" type="password" value={form.password} onChange={(password) => setForm({ ...form, password })} />{error && <p className="text-sm text-red-600">{error}</p>}<button disabled={saving} className="w-full bg-black text-white py-3 rounded-full font-semibold disabled:opacity-60">{saving ? 'Logging in…' : 'Login'}</button><p className="text-center text-sm text-gray-600">New here? <Link to="/register" className="font-semibold text-amber-700">Create an account</Link></p></form></AuthForm>;
}
export function AuthForm({ title, subtitle, children }) { return <div className="min-h-screen bg-gray-50 pt-32 pb-16 px-4"><div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-7 md:p-9"><h1 className="font-serif text-3xl font-bold text-gray-900">{title}</h1><p className="mt-2 mb-7 text-gray-600">{subtitle}</p>{children}</div></div>; }
export function Input({ label, value, onChange, type = 'text', required = true }) { return <label className="block"><span className="block mb-1 text-sm font-semibold text-gray-700">{label}</span><input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-amber-600 focus:outline-none" /></label>; }
