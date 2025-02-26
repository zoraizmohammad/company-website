
import React from 'react';
import { motion } from "framer-motion";
import { Users, FileText, Settings, Database } from "lucide-react";
import Header from "@/components/Header";
import { useLocation } from 'react-router-dom';
import WorkNightAdmin from './WorkNightAdmin';

const AdminDashboard = () => {
  const location = useLocation();
  const isWorkNight = location.pathname.includes('worknight');

  if (isWorkNight) {
    return <WorkNightAdmin />;
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <Header />
      <div className="text-white p-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-[#F97316]">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Manage and monitor health demographic data</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 text-[#F97316] mb-4">
                <Users className="w-5 h-5" />
                <span className="font-medium">Total Responses</span>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold">1,234</div>
                <div className="text-sm text-green-400">+12% from last month</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 text-[#0EA5E9] mb-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="font-medium">Average Age</span>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold">27.5</div>
                <div className="text-sm text-gray-400">Years old</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 text-[#0EA5E9] mb-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  />
                </svg>
                <span className="font-medium">Database Status</span>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-bold text-green-400">Healthy</div>
                <div className="text-sm text-gray-400">Last backup: 2h ago</div>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 text-[#0EA5E9] mb-6">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="font-medium">Quick Actions</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 rounded-lg bg-gradient-to-r from-[#F97316] to-[#0EA5E9] text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <Users className="w-5 h-5" />
                Export User Data
              </button>
              
              <button className="p-4 rounded-lg bg-gradient-to-r from-[#F97316] to-[#0EA5E9] text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <FileText className="w-5 h-5" />
                Generate Report
              </button>
              
              <button className="p-4 rounded-lg bg-gradient-to-r from-[#F97316] to-[#0EA5E9] text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <Settings className="w-5 h-5" />
                System Settings
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
