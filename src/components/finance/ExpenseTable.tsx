
import React, { useState } from "react";
import { ExpenseEntry, BudgetCategory } from "@/hooks/useFinanceData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ExpenseTableProps {
  expenses: ExpenseEntry[];
  categories: BudgetCategory[];
  onAdd: (e: { amount: number; category: string; description: string }) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, e: { amount: number; category: string; description: string }) => void;
}

export function ExpenseTable({ expenses, categories, onAdd, onDelete, onEdit }: ExpenseTableProps) {
  const [newDesc, setNewDesc] = useState("");
  const [newAmt, setNewAmt] = useState<number>(0);
  const [newCat, setNewCat] = useState(categories[0]?.name || "");

  // For editing
  const [editId, setEditId] = useState<string | null>(null);
  const [editDesc, setEditDesc] = useState("");
  const [editAmt, setEditAmt] = useState<number>(0);
  const [editCat, setEditCat] = useState("");

  const handleAdd = () => {
    if (!newCat || !newDesc || !newAmt) return;
    onAdd({ amount: newAmt, category: newCat, description: newDesc });
    setNewDesc("");
    setNewAmt(0);
    setNewCat(categories[0]?.name || "");
  };

  const startEdit = (exp: ExpenseEntry) => {
    setEditId(exp.id);
    setEditDesc(exp.description);
    setEditAmt(exp.amount);
    setEditCat(exp.category);
  };

  const handleEditSave = () => {
    if (!editId) return;
    onEdit(editId, { amount: editAmt, category: editCat, description: editDesc });
    setEditId(null);
  };

  return (
    <div>
      <h4 className="font-semibold mb-2">Expenses</h4>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end mb-2">
        <Input
          placeholder="Description"
          value={newDesc}
          onChange={e => setNewDesc(e.target.value)}
        />
        <Input
          placeholder="Amount"
          type="number"
          value={newAmt}
          onChange={e => setNewAmt(Number(e.target.value))}
        />
        <select className="border rounded p-2 h-10" value={newCat} onChange={e => setNewCat(e.target.value)}>
          {categories.map(c => (
            <option key={c.name}>{c.name}</option>
          ))}
        </select>
        <Button onClick={handleAdd} className="col-span-1">Add</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-slate-100">
              <th className="px-2 py-1">Date</th>
              <th className="px-2 py-1">Desc</th>
              <th className="px-2 py-1">Category</th>
              <th className="px-2 py-1">Amount</th>
              <th className="px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">No expenses yet!</td>
              </tr>
            )}
            {expenses.map(exp => (
              <tr key={exp.id}>
                <td className="border px-2 py-1">{new Date(exp.date).toLocaleDateString()}</td>
                <td className="border px-2 py-1">
                  {editId === exp.id ? (
                    <Input value={editDesc} onChange={e => setEditDesc(e.target.value)} />
                  ) : exp.description}
                </td>
                <td className="border px-2 py-1">
                  {editId === exp.id ? (
                    <select value={editCat} onChange={e => setEditCat(e.target.value)} className="border rounded p-1">
                      {categories.map(c => (
                        <option key={c.name}>{c.name}</option>
                      ))}
                    </select>
                  ) : exp.category}
                </td>
                <td className="border px-2 py-1">
                  {editId === exp.id ? (
                    <Input value={editAmt} type="number" onChange={e => setEditAmt(Number(e.target.value))} />
                  ) : `€${exp.amount}`}
                </td>
                <td className="border px-2 py-1 flex gap-1">
                  {editId === exp.id ? (
                    <>
                      <Button size="sm" onClick={handleEditSave}>Save</Button>
                      <Button size="sm" variant="outline" onClick={() => setEditId(null)}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" onClick={() => startEdit(exp)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => onDelete(exp.id)}>Delete</Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
