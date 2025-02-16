import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Users, FileText, Settings, Database, DollarSign, Activity, ChevronDown, ChevronUp, Phone, Mail, MapPin } from "lucide-react";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";

interface LatestApplication {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  created_at: string;
  employer_name: string;
  annual_income: number;
  loan_amount: number;
}

const TrustedLoansAdmin = () => {
  const [isLatestOpen, setIsLatestOpen] = useState(false);
  const [latestApplication, setLatestApplication] = useState<LatestApplication | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLatestApplication = async () => {
      try {
        const { data, error } = await supabase
          .from('loan_applications')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching latest application:', error);
          toast({
            title: "Error",
            description: "Could not fetch latest application data",
            variant: "destructive",
          });
          return;
        }

        if (data) {
          setLatestApplication(data as LatestApplication);
        }
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    };

    fetchLatestApplication();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header isTrustedLoans />
      <div className="text-gray-800 p-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-[#0FA0CE]">Loan Management Dashboard</h1>
            <p className="text-gray-600 mt-2">Monitor loan applications and analytics</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 text-[#0FA0CE] mb-4">
                <Users className="w-5 h-5" />
                <span className="font-medium">Active Applications</span>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold">342</div>
                <div className="text-sm text-green-600">+12% from last month</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 text-[#0FA0CE] mb-4">
                <DollarSign className="w-5 h-5" />
                <span className="font-medium">Total Loan Volume</span>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold">$2.4M</div>
                <div className="text-sm text-gray-600">This quarter</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 text-[#0FA0CE] mb-4">
                <Activity className="w-5 h-5" />
                <span className="font-medium">Approval Rate</span>
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-bold">76%</div>
                <div className="text-sm text-gray-600">Last 30 days</div>
              </div>
            </motion.div>
          </div>

          {/* Latest Application Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <Collapsible
              open={isLatestOpen}
              onOpenChange={setIsLatestOpen}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3 text-[#0FA0CE]">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">Latest Application</span>
                </div>
                {isLatestOpen ? (
                  <ChevronUp className="h-5 w-5 text-[#0FA0CE]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#0FA0CE]" />
                )}
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-4">
                {latestApplication ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900">{latestApplication.full_name}</h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${latestApplication.email}`} className="hover:text-[#0FA0CE]">
                            {latestApplication.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:${latestApplication.phone}`} className="hover:text-[#0FA0CE]">
                            {latestApplication.phone}
                          </a>
                        </div>
                        <div className="flex items-start gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 mt-1" />
                          <div>
                            {latestApplication.address}<br />
                            {latestApplication.city}, {latestApplication.state} {latestApplication.zip_code}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="text-gray-600">
                          <span className="font-medium">Employer:</span> {latestApplication.employer_name}
                        </div>
                        <div className="text-gray-600">
                          <span className="font-medium">Annual Income:</span> ${latestApplication.annual_income.toLocaleString()}
                        </div>
                        <div className="text-gray-600">
                          <span className="font-medium">Loan Amount:</span> ${latestApplication.loan_amount.toLocaleString()}
                        </div>
                        <div className="text-gray-600">
                          <span className="font-medium">Submitted:</span> {format(new Date(latestApplication.created_at), 'PPpp')}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 text-center py-4">
                    No applications found
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          </motion.div>

          {/* Quick Actions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 text-[#0FA0CE] mb-6">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Quick Actions</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 rounded-lg bg-white border border-[#0FA0CE] text-[#0FA0CE] font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <Users className="w-5 h-5" />
                Review Applications
              </button>
              
              <button className="p-4 rounded-lg bg-white border border-[#0FA0CE] text-[#0FA0CE] font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <FileText className="w-5 h-5" />
                Generate Reports
              </button>
              
              <button className="p-4 rounded-lg bg-white border border-[#0FA0CE] text-[#0FA0CE] font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <Database className="w-5 h-5" />
                System Settings
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrustedLoansAdmin;
