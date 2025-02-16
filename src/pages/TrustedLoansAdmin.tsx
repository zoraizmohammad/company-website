import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Users, FileText, Settings, Database, DollarSign, Activity, ChevronDown, ChevronUp, Phone, Mail, MapPin, Code } from "lucide-react";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";

interface LatestApplication {
  id: string;
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

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  status: 'Success' | 'Failed';
}

const mockTransactions: Transaction[] = [
  {
    hash: '0x12345678...90abcdef',
    from: '0xbe384aa1b5...a393f79',
    to: '0x987654...321abcd',
    value: '0.05 ETH',
    status: 'Success'
  },
  // Add more mock transactions as needed
];

const mockVectorSet = [
  [0.8234, 0.1234, 0.5567, 0.789],
  [0.2345, 0.5678, 0.5812, 0.3456],
  [0.6789, 0.8123, 0.4567, 0.8901]
];

const TrustedLoansAdmin = () => {
  const [isLatestOpen, setIsLatestOpen] = useState(false);
  const [isDevelopmentToolsOpen, setIsDevelopmentToolsOpen] = useState(false);
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
          .maybeSingle();

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

  const renderLatestApplication = () => {
    if (!latestApplication) {
      return (
        <div className="text-gray-500 text-center py-4">
          No applications found
        </div>
      );
    }

    return (
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
    );
  };

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

          {/* Development Tools Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <Collapsible
              open={isDevelopmentToolsOpen}
              onOpenChange={setIsDevelopmentToolsOpen}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3 text-[#0FA0CE]">
                  <Code className="w-5 h-5" />
                  <span className="font-medium">Development Tools</span>
                </div>
                {isDevelopmentToolsOpen ? (
                  <ChevronUp className="h-5 w-5 text-[#0FA0CE]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#0FA0CE]" />
                )}
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-6 space-y-6">
                {/* Latest Application Section */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Latest Candidate Information</h3>
                  {renderLatestApplication()}
                </div>

                {/* Recent Transactions Section */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Holesky Testnet Transactions</h3>
                  <div className="space-y-3">
                    {mockTransactions.map((tx, index) => (
                      <div key={index} className="bg-white p-3 rounded-md shadow-sm">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-gray-600">Transaction Hash:</div>
                          <div className="text-[#0FA0CE]">{tx.hash}</div>
                          <div className="text-gray-600">From:</div>
                          <div>{tx.from}</div>
                          <div className="text-gray-600">To:</div>
                          <div>{tx.to}</div>
                          <div className="text-gray-600">Value:</div>
                          <div>{tx.value}</div>
                          <div className="text-gray-600">Status:</div>
                          <div className="text-green-600">{tx.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vector Set Section */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Latest Homomorphically Encrypted Vector Set</h3>
                  <pre className="bg-white p-4 rounded-md shadow-sm overflow-auto text-sm">
                    {JSON.stringify(mockVectorSet, null, 2)}
                  </pre>
                </div>
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
