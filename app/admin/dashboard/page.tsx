'use client'

import { useState } from 'react'
import { Server, Activity, Users, ShieldAlert, ArrowUpRight, ArrowDownRight, Database, CheckCircle, XCircle, Clock } from 'lucide-react'

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Quick Actions */}
            <div className="flex items-center justify-between mb-8">
                <div>
                     <h1 className="text-2xl font-sora font-bold text-slate-900">System Overview</h1>
                     <p className="text-sm text-slate-500 mt-1">Global health network status and pending administrative actions.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border text-slate-700 font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-sm transition-colors hover:bg-slate-50">
                        <Database className="w-4 h-4" />
                        Run Audit
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-sm shadow-indigo-600/20 transition-colors">
                        <ShieldAlert className="w-4 h-4" />
                        Review KYC Queue
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { title: 'Registered Patients', value: '1.4M', change: '+2.4%', trend: 'up', icon: Users },
                    { title: 'Verified Institutions', value: '342', change: '+12', trend: 'up', icon: Activity },
                    { title: 'Active Data Nodes', value: '1,024', change: 'Stable', trend: 'up', icon: Server },
                    { title: 'Pending KYC', value: '14', change: '-4', trend: 'down', icon: ShieldAlert, alert: true },
                ].map((stat, i) => (
                    <div key={i} className={`bg-white border rounded-xl p-6 shadow-sm ${stat.alert ? 'border-amber-200' : 'border-slate-200'}`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.alert ? 'bg-amber-50' : 'bg-indigo-50'}`}>
                                <stat.icon className={`w-5 h-5 ${stat.alert ? 'text-amber-600' : 'text-indigo-600'}`} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : stat.alert ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : stat.trend === 'down' ? <ArrowDownRight className="w-3 h-3" /> : null}
                                {stat.change}
                            </div>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium">{stat.title}</h3>
                        <div className="text-3xl font-bold font-sora text-slate-900 mt-1">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Network Load & KYC Queue */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Network Load Chart Prototype */}
                <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
                        <h2 className="text-base font-bold text-slate-900 font-sora">Global Network Compute Load</h2>
                        <div className="flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                             <span className="text-xs font-bold text-slate-500 uppercase">Live</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center h-64 relative overflow-hidden bg-slate-50 rounded-lg border border-slate-100 px-4">
                        {/* Mock Sine/Load wave UI */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                        <div className="w-full flex items-end gap-1 h-3/4 opacity-80 z-10">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <div key={i} className="flex-1 bg-indigo-500 rounded-t-sm" style={{ height: `${Math.random() * 60 + 20}%` }} />
                            ))}
                        </div>
                        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur rounded p-2 text-[10px] font-bold text-slate-500 border border-slate-200 shadow-sm">
                            Avg Load: 45.2%
                        </div>
                    </div>
                </div>

                {/* KYC Queue List */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
                        <h2 className="text-base font-bold text-slate-900 font-sora">Priority KYC Queue</h2>
                    </div>
                    
                    <div className="flex-1 flex flex-col gap-4">
                        {[
                            { name: 'Abuja Central Hosp', time: '2h ago', risk: 'Low', type: 'Hospital' },
                            { name: 'Pretoria bioData', time: '5h ago', risk: 'Medium', type: 'Researcher' },
                            { name: 'Dr. John Doe Clinic', time: '1d ago', risk: 'High', type: 'Hospital' },
                            { name: 'Accra Genomics', time: '1d ago', risk: 'Low', type: 'Researcher' },
                        ].map((req, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-[10px]">
                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900 truncate max-w-[120px]">{req.name}</div>
                                        <div className="text-[10px] text-slate-500 uppercase font-semibold">{req.type}</div>
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-emerald-600 hover:bg-emerald-50 p-1 rounded transition-colors"><CheckCircle className="w-4 h-4" /></button>
                                    <button className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"><XCircle className="w-4 h-4" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button className="mt-4 w-full py-2 border border-indigo-200 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors">
                        View All Pending Applications
                    </button>
                </div>
            </div>
        </div>
    )
}
