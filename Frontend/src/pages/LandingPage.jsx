import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/finforge-logo.svg'

import {
  ArrowRight,
  BadgeIndianRupee,
  BarChart3,
  CheckCircle2,
  CreditCard,
  Globe2,
  LockKeyhole,
  MoonStar,
  PieChart,
  ShieldCheck,
  Sparkles,
  Wallet
} from 'lucide-react'

const FEATURES = [
  {
    icon: Wallet,
    title: 'Track every transaction',
    desc: 'Monitor income and expenses with a clean workflow built for day-to-day money management.'
  },
  {
    icon: BarChart3,
    title: 'Readable financial analytics',
    desc: 'See balance trends, monthly comparisons, and clear visual summaries without overwhelming tables.'
  },
  {
    icon: Globe2,
    title: 'Multi-currency ready',
    desc: 'Switch across major currencies with exchange-rate support for a flexible financial view.'
  },
  {
    icon: LockKeyhole,
    title: 'Secure account access',
    desc: 'Protected authentication keeps user data scoped and accessible only after sign-in.'
  },
  {
    icon: MoonStar,
    title: 'Comfortable interface',
    desc: 'Enjoy a polished experience with dark mode, responsive layouts, and thoughtful visual hierarchy.'
  },
  {
    icon: PieChart,
    title: 'Category-based insights',
    desc: 'Understand where money goes through breakdowns that make spending patterns easy to spot.'
  }
]

const HIGHLIGHTS = [
  'Income and expense tracking',
  'Interactive charts and insights',
  'Protected user-specific data',
  'Responsive modern interface'
]

const METRICS = [
  { value: '5+', label: 'Currencies Supported' },
  { value: '100%', label: 'User Scoped Data' },
  { value: '24/7', label: 'Access Anywhere' }
]

export default function LandingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.12 }
    )

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_35%),linear-gradient(to_bottom,_#f8fafc,_#ffffff)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_30%),linear-gradient(to_bottom,_#020617,_#020617)]">
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
  <img
    src={logo}
    alt="Fin Forge logo"
    className="w-10 h-10 rounded-2xl shadow-lg shadow-blue-500/20"
  />
  <div>
    <p className="font-bold text-slate-900 dark:text-white tracking-tight">Fin Forge</p>
    <p className="text-xs text-slate-500 dark:text-slate-400">Financial Management Website</p>
  </div>
</div>


          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-4 py-2 text-sm font-semibold text-white dark:text-slate-900 transition hover:scale-[1.02]"
            >
              Create Account
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-0 w-72 h-72 rounded-full bg-blue-300/20 dark:bg-blue-500/10 blur-3xl" />
          <div className="absolute top-28 right-0 w-80 h-80 rounded-full bg-emerald-300/20 dark:bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-sky-200/20 dark:bg-sky-500/5 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-14 lg:pt-24 lg:pb-20">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
            <div className="reveal opacity-0 translate-y-4 transition-all duration-700">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-900 bg-sky-50/80 dark:bg-sky-950/40 px-4 py-2 text-sm font-medium text-sky-700 dark:text-sky-300">
                <Sparkles className="w-4 h-4" />
                Finance tracking with analytics, clarity, and control
              </div>

              <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 dark:text-white leading-[0.98]">
                Manage money with a dashboard that actually feels
                <span className="block bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
                  calm and useful
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Fin Forge helps users track income, monitor expenses, review category-wise spending,
                and understand monthly financial movement through a polished full-stack experience.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 hover:-translate-y-0.5"
                >
                  Start Free
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-6 py-4 text-base font-semibold text-slate-900 dark:text-white transition hover:border-slate-400 dark:hover:border-slate-600"
                >
                  Go to Login
                </Link>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-3 max-w-2xl">
                {HIGHLIGHTS.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 px-4 py-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal opacity-0 translate-y-6 transition-all duration-700 delay-100">
              <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 shadow-2xl shadow-slate-900/5 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center">
                      <Wallet className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Overview</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Personal financial snapshot</p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    INR
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 p-4 text-white">
                      <p className="text-xs opacity-80">Balance</p>
                      <p className="mt-2 text-xl font-bold">₹1,24,500</p>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 p-4 text-white">
                      <p className="text-xs opacity-80">Income</p>
                      <p className="mt-2 text-xl font-bold">₹2,50,000</p>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 p-4 text-white">
                      <p className="text-xs opacity-80">Expenses</p>
                      <p className="mt-2 text-xl font-bold">₹1,25,500</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Balance Trend</p>
                        <span className="text-xs text-emerald-600 font-semibold">+12.4%</span>
                      </div>
                      <div className="flex items-end gap-2 h-36">
                        {[30, 48, 42, 60, 55, 78, 70, 88, 74, 95].map((height, index) => (
                          <div key={index} className="flex-1 rounded-t-xl bg-gradient-to-t from-blue-600 to-sky-400" style={{ height: `${height}%`, opacity: 0.35 + index * 0.05 }} />
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Top Categories</p>
                      <div className="space-y-3">
                        {[
                          ['Rent', '42%', 'bg-rose-500'],
                          ['Groceries', '24%', 'bg-amber-500'],
                          ['Transport', '18%', 'bg-blue-500'],
                          ['Other', '16%', 'bg-violet-500']
                        ].map(([label, value, color]) => (
                          <div key={label}>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-slate-600 dark:text-slate-300">{label}</span>
                              <span className="text-slate-500 dark:text-slate-400">{value}</span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                              <div className={`h-full rounded-full ${color}`} style={{ width: value }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Recent Activity</p>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Today</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        ['Salary credited', '+₹80,000', 'text-emerald-600'],
                        ['Grocery payment', '-₹4,250', 'text-rose-500'],
                        ['Transport', '-₹1,180', 'text-rose-500']
                      ].map(([label, value, tone]) => (
                        <div key={label} className="flex items-center justify-between rounded-xl bg-white dark:bg-slate-950 px-3 py-2.5 border border-slate-200 dark:border-slate-800">
                          <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
                          <span className={`text-sm font-semibold ${tone}`}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal opacity-0 translate-y-4 transition-all duration-700 delay-150 mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {METRICS.map((metric) => (
              <div
                key={metric.label}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 px-6 py-5 text-center"
              >
                <p className="text-3xl font-black text-slate-950 dark:text-white">{metric.value}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-950/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="reveal opacity-0 translate-y-4 transition-all duration-700 text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
              Core Benefits
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
              A solid finance workflow without visual clutter
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Built to feel structured and trustworthy, with practical features that support real money tracking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon

              return (
                <div
                  key={feature.title}
                  className="reveal opacity-0 translate-y-5 transition-all duration-700 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="reveal opacity-0 translate-y-4 transition-all duration-700">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-400">
                Why It Works
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                Designed to help users understand money, not just store data
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                Fin Forge combines a responsive interface, user-level security, and clean analytics so the product
                feels practical for everyday use and polished enough to showcase professionally.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: CreditCard,
                    title: 'Transaction-first flow',
                    desc: 'Users can add, edit, and review financial activity through a clear interface.'
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Authenticated experience',
                    desc: 'Protected routes and secure access keep dashboard data scoped to the signed-in user.'
                  },
                  {
                    icon: Sparkles,
                    title: 'Modern presentation',
                    desc: 'Strong visual hierarchy, dark mode support, and responsive layouts keep the experience polished.'
                  }
                ].map((item) => {
                  const Icon = item.icon

                  return (
                    <div key={item.title} className="flex gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/60 p-4">
                      <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-950 dark:text-white">{item.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="reveal opacity-0 translate-y-6 transition-all duration-700 delay-100">
              <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8 text-white shadow-2xl">
                <p className="text-sm uppercase tracking-[0.24em] text-blue-200">Built For</p>
                <h3 className="mt-3 text-3xl font-black">A strong project portfolio piece</h3>
                <p className="mt-4 text-slate-300 leading-7">
                  The website shows both frontend polish and backend capability through authentication,
                  dashboard views, analytics, and structured transaction handling.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    'React + Vite',
                    'Tailwind CSS',
                    'Node + Express',
                    'MongoDB + JWT'
                  ].map((tech) => (
                    <div key={tech} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-slate-100">
                      {tech}
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-300">Project Positioning</p>
                  <p className="mt-2 text-xl font-bold">Full-Stack Financial Management Website</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="reveal opacity-0 translate-y-4 transition-all duration-700 rounded-[2rem] overflow-hidden bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 p-[1px] shadow-2xl shadow-blue-500/20">
            <div className="rounded-[calc(2rem-1px)] bg-slate-950 px-8 py-12 text-center">
              <p className="text-sm uppercase tracking-[0.24em] text-blue-300">Get Started</p>
              <h2 className="mt-4 text-4xl font-black text-white">
                Bring your finances into one clear workspace
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-lg leading-8">
                Create an account, add transactions, and start exploring balance trends, insights, and category-wise reporting.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-bold text-slate-950 transition hover:scale-[1.02]"
                >
                  Create Free Account
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/5"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/80">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
  <img
    src={logo}
    alt="Fin Forge logo"
    className="w-10 h-10 rounded-2xl"
  />
  <div>
    <p className="font-bold text-slate-950 dark:text-white">Fin Forge</p>
    <p className="text-sm text-slate-500 dark:text-slate-400">Full-Stack Financial Management Website</p>
  </div>
</div>


          <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
            © {new Date().getFullYear()} Fin Forge. Built to manage transactions, analytics, and financial visibility.
          </p>
        </div>
      </footer>

      <style>{`
        .reveal { opacity: 0; transform: translateY(16px); }
        .animate-in { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>
    </div>
  )
}
