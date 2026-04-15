import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Building2,
  ChartBar,
  Settings,
  Search,
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
} from "lucide-react";

interface Invoice {
  id: string;
  vendor: string;
  amount: number;
  date: string;
  status: "pending" | "approved" | "rejected";
}

const invoices: Invoice[] = [
  { id: "INV-001", vendor: "Acme Corp", amount: 12500, date: "Jan 15, 2026", status: "pending" },
  { id: "INV-002", vendor: "TechStart Inc", amount: 8750, date: "Jan 14, 2026", status: "approved" },
  { id: "INV-003", vendor: "Global Services", amount: 3200, date: "Jan 14, 2026", status: "rejected" },
  { id: "INV-004", vendor: "DataFlow Ltd", amount: 15000, date: "Jan 13, 2026", status: "pending" },
  { id: "INV-005", vendor: "CloudBase", amount: 6800, date: "Jan 12, 2026", status: "pending" },
];

const lineItems = [
  { item: "Consulting Services", amount: 8000 },
  { item: "Software License", amount: 3500 },
  { item: "Support & Maintenance", amount: 1000 },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: false },
  { icon: FileText, label: "Invoices", active: true },
  { icon: Building2, label: "Vendors", active: false },
  { icon: ChartBar, label: "Reports", active: false },
  { icon: Settings, label: "Settings", active: false },
];

function formatCurrency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function StatusBadge({ status }: { status: Invoice["status"] }) {
  const cls =
    status === "approved"
      ? "bg-primary text-primary-foreground"
      : status === "rejected"
        ? "bg-destructive text-destructive-foreground"
        : "bg-secondary text-secondary-foreground";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function StatCard({ title, value, badge }: { title: string; value: string; badge?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <div className="mt-2 flex items-center gap-2">
        <p className="text-2xl font-medium text-card-foreground">{value}</p>
        {badge && (
          <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="flex h-full w-64 flex-col gap-4 border-r border-sidebar-border bg-sidebar p-2">
      <div className="flex items-center gap-2 rounded-md px-2 py-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
          <FileText className="h-4 w-4 text-sidebar-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-sidebar-foreground">InvoiceApp</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <p className="px-2 py-1 text-xs font-medium uppercase text-muted-foreground">Menu</p>
        {sidebarItems.map((item) => (
          <button
            key={item.label}
            className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
              item.active
                ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-md px-2 py-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-xs font-medium text-sidebar-accent-foreground">
          JD
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-sidebar-foreground">John Doe</span>
          <span className="text-xs text-muted-foreground">john@acmecorp.com</span>
        </div>
      </div>
    </aside>
  );
}

function DetailPanel({ invoice, onClose }: { invoice: Invoice; onClose: () => void }) {
  return (
    <div className="absolute right-0 top-0 z-10 flex h-full w-[420px] flex-col border-l border-border bg-background shadow-lg">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">{invoice.id}</h2>
          <p className="text-sm text-muted-foreground">{invoice.vendor}</p>
        </div>
        <button onClick={onClose} className="rounded-md p-1 hover:bg-accent">
          <X className="h-4 w-4 text-foreground" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-5">
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">Invoice Details</h3>
            <div className="space-y-1.5 text-sm">
              {[
                ["Vendor", invoice.vendor],
                ["Amount", formatCurrency(invoice.amount)],
                ["Submitted", invoice.date],
                ["Due Date", "Feb 15, 2026"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">Line Items</h3>
            <div className="overflow-hidden rounded-md border border-border">
              <div className="flex justify-between bg-muted px-2.5 py-1.5 text-xs font-medium text-muted-foreground">
                <span>Item</span>
                <span>Amount</span>
              </div>
              {lineItems.map((li, i) => (
                <div
                  key={li.item}
                  className={`flex justify-between px-2.5 py-1.5 text-sm text-foreground ${
                    i < lineItems.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span>{li.item}</span>
                  <span>{formatCurrency(li.amount)}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">AI Extraction Confidence</span>
              <span className="font-semibold text-foreground">96%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[96%] rounded-full bg-primary" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Comment</label>
            <textarea
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              rows={3}
              placeholder="Add a comment (optional)..."
            />
          </div>
          <div className="flex gap-3">
            <button className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Approve
            </button>
            <button className="flex-1 rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState<Invoice | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const panelOpen = Boolean(selected);

  const filtered = invoices.filter((i) => {
    const matchesStatus = filter === "all" || i.status === filter;
    const matchesSearch = i.vendor.toLowerCase().includes(search.toLowerCase());
    const matchesFrom = !fromDate || i.date >= fromDate;
    const matchesTo = !toDate || i.date <= toDate;

    return matchesStatus && matchesSearch && matchesFrom && matchesTo;
  });

  return (
    <div className="relative flex h-screen overflow-hidden bg-background font-sans text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Invoice Approval</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Review and manage invoice approvals
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <StatCard title="Total Invoices" value="1,248" badge="+12%" />
            <StatCard title="Pending Approval" value="23" />
            <StatCard title="Approved Today" value="8" />
            <StatCard title="Rejected" value="5" />
          </div>

          <div className="flex items-end gap-3">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search vendors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="h-10 appearance-none rounded-md border border-input bg-background px-3 pr-8 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="From date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="h-10 w-40 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <input
              type="text"
              placeholder="To date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="h-10 w-40 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                    Invoice #
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                    Vendor Name
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                    Amount (USD)
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                    Submitted Date
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv) => (
                  <tr
                    key={inv.id}
                    onClick={() => setSelected(inv)}
                    className="cursor-pointer border-b border-border last:border-0 hover:bg-muted/50"
                  >
                    <td className="px-4 py-2.5 font-medium text-foreground">{inv.id}</td>
                    <td className="px-4 py-2.5 text-foreground">{inv.vendor}</td>
                    <td className="px-4 py-2.5 text-foreground">{formatCurrency(inv.amount)}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{inv.date}</td>
                    <td className="px-4 py-2.5">
                      <StatusBadge status={inv.status} />
                    </td>
                    <td className="px-4 py-2.5">
                      {inv.status === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="rounded-md border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:bg-accent"
                          >
                            Approve
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="rounded-md bg-destructive px-3 py-1 text-xs font-medium text-destructive-foreground hover:bg-destructive/90"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">&mdash;</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between bg-muted px-4 py-2.5 text-xs text-muted-foreground">
              <span>Showing {filtered.length} of 23 invoices</span>
              <div className="flex items-center gap-1">
                <button className="inline-flex items-center rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent">
                  <ChevronLeft className="mr-1 h-3 w-3" />
                  Previous
                </button>
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-xs font-medium shadow-sm text-foreground">
                  1
                </button>
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium text-muted-foreground hover:bg-accent">
                  2
                </button>
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium text-muted-foreground hover:bg-accent">
                  3
                </button>
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium text-muted-foreground">
                  <Ellipsis className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent">
                  Next
                  <ChevronRight className="ml-1 h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div
        className={`absolute inset-y-0 right-0 z-10 transition-transform duration-300 ease-out ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selected && <DetailPanel invoice={selected} onClose={() => setSelected(null)} />}
      </div>
    </div>
  );
}
