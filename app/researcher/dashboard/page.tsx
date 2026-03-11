'use client'

import { useState } from 'react'
import { Database, Activity, FileText, ArrowUpRight, Lock, Zap } from 'lucide-react'

export default function ResearcherDashboardPage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Quick Actions */}
            <div className="flex items-center justify-between mb-8">
                <div>
                     <h1 className="text-2xl font-sora font-bold text-slate-900">Research Command Center</h1>
                     <p className="text-sm text-slate-500 mt-1">Review your active queries and dataset compute power.</p>
                </div>
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-sm shadow-teal-600/20 transition-colors">
                    <Activity className="w-4 h-4" />
                    New Cohort Query
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: 'Active Data Streams', value: '4', change: 'Live', trend: 'up', icon: Zap },
                    { title: 'Anonymized Records', value: '1.2M', change: '+124k', trend: 'up', icon: Database },
                    { title: 'Contract Computations', value: '48', change: 'Executing', trend: 'up', icon: FileText },
                ].map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                                <stat.icon className="w-5 h-5 text-teal-600" />
                            </div>
                            <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">
                                <ArrowUpRight className="w-3 h-3" />
                                {stat.change}
                            </div>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium">{stat.title}</h3>
                        <div className="text-3xl font-bold font-sora text-slate-900 mt-1">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Compute Usage & Active Cohorts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Graph Placeholder */}
                <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
                        <h2 className="text-base font-bold text-slate-900 font-sora">Data Pipeline Throughput</h2>
                        <select className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none">
                            <option>Last 7 Days</option>
                            <option>This Month</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-end gap-2 pt-4">
                        {/* Mock Bar Chart using teal */}
                        {[30, 45, 60, 40, 75, 55, 85].map((height, idx) => (
                            <div key={idx} className="flex-1 bg-teal-50 rounded-t-sm relative group hover:bg-teal-100 transition-colors">
                                <div 
                                    className="absolute bottom-0 w-full bg-teal-500 rounded-t-sm transition-all group-hover:bg-teal-600" 
                                    style={{ height: `${height}%` }}
                                />
                                <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded font-bold whitespace-nowrap">
                                    {height * 12} queries / s
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500 font-medium mt-3 px-2">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                {/* Active Cohorts List */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
                        <h2 className="text-base font-bold text-slate-900 font-sora">Live Active Cohorts</h2>
                    </div>
                    
                    <div className="flex-1 flex flex-col gap-4">
                        {[
                            { name: 'Diabetic Subset Alpha', records: '482k', status: 'Streaming' },
                            { name: 'Cardiac History > 50', records: '1.1M', status: 'Paused' },
                            { name: 'Oncology Phase II', records: '45k', status: 'Streaming' },
                            { name: 'Pediatric General', records: '890k', status: 'Computing' },
                        ].map((cohort, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-[10px]">
                                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900 truncate max-w-[120px]">{cohort.name}</div>
                                        <div className="text-[10px] text-slate-500 uppercase font-semibold">{cohort.records} records</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-[10px] font-bold px-2 py-0.5 rounded ${cohort.status === 'Streaming' ? 'bg-emerald-50 text-emerald-700' : cohort.status === 'Computing' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                                        {cohort.status}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button className="mt-4 w-full py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                        View All Datasets
                    </button>
                </div>
            </div>
        </div>
    )
}
