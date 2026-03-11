'use client'

import { useState } from 'react'
import { Activity, Users, FileText, ArrowUpRight, ArrowDownRight, QrCode } from 'lucide-react'

export default function HospitalDashboardPage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Quick Actions */}
            <div className="flex items-center justify-between mb-8">
                <div>
                     <h1 className="text-2xl font-sora font-bold text-slate-900">Good Morning, Dr. Adebayo</h1>
                     <p className="text-sm text-slate-500 mt-1">Here is the latest activity for Lagos General Hospital.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-sm shadow-blue-600/20 transition-colors">
                    <QrCode className="w-4 h-4" />
                    New Patient Scan
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: 'Total Patients Managed', value: '1,248', change: '+12%', trend: 'up', icon: Users },
                    { title: 'Recent Scans (24h)', value: '34', change: '-2%', trend: 'down', icon: QrCode },
                    { title: 'Data Uploads (24h)', value: '156', change: '+24%', trend: 'up', icon: FileText },
                ].map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                <stat.icon className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.change}
                            </div>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium">{stat.title}</h3>
                        <div className="text-3xl font-bold font-sora text-slate-900 mt-1">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Activity Chart & Recent Access */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Graph Placeholder */}
                <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
                        <h2 className="text-base font-bold text-slate-900 font-sora">Network Traffic & Access</h2>
                        <select className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none">
                            <option>Last 7 Days</option>
                            <option>This Month</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-end gap-2 pt-4">
                        {/* Mock Bar Chart */}
                        {[40, 60, 45, 80, 55, 90, 75].map((height, idx) => (
                            <div key={idx} className="flex-1 bg-blue-50 rounded-t-sm relative group hover:bg-blue-100 transition-colors">
                                <div 
                                    className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm transition-all group-hover:bg-blue-600" 
                                    style={{ height: `${height}%` }}
                                />
                                <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded font-bold">
                                    {height * 2} scans
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500 font-medium mt-3 px-2">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                {/* Recent Access List */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
                        <h2 className="text-base font-bold text-slate-900 font-sora">Recent Patient Access</h2>
                    </div>
                    
                    <div className="flex-1 flex flex-col gap-4">
                        {[
                            { name: 'Osei, Kwame', id: '#8842A', time: '10 mins ago', type: 'Full Read' },
                            { name: 'Abiola, Sarah', id: '#9210B', time: '2 hrs ago', type: 'Append Rec.' },
                            { name: 'Mensa, David', id: '#1104C', time: '5 hrs ago', type: 'Full Read' },
                            { name: 'Okafor, Chioma', id: '#3321D', time: 'Yesterday', type: 'Append Rec.' },
                        ].map((log, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">
                                        {log.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900">{log.name}</div>
                                        <div className="text-[10px] text-slate-500 uppercase font-semibold">{log.id}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-[10px] font-bold px-2 py-0.5 rounded ${log.type === 'Full Read' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'}`}>
                                        {log.type}
                                    </div>
                                    <div className="text-xs text-slate-400 mt-1">{log.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button className="mt-4 w-full py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                        View Complete Audit Log
                    </button>
                </div>
            </div>
        </div>
    )
}
