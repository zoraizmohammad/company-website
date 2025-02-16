
import { BarChart, Bar, Cell, PieChart, Pie, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ScatterChart, Scatter, XAxis, YAxis, ZAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const ageData = [
  { subject: '18-24', A: 30, fulltime: 20, parttime: 10 },
  { subject: '25-34', A: 45, fulltime: 35, parttime: 10 },
  { subject: '35-44', A: 15, fulltime: 12, parttime: 3 },
  { subject: '45-54', A: 7, fulltime: 5, parttime: 2 },
  { subject: '55+', A: 3, fulltime: 2, parttime: 1 },
];

const genderData = [
  { name: 'Male', value: 55 },
  { name: 'Female', value: 40 },
  { name: 'Non-binary', value: 3 },
  { name: 'Other', value: 2 },
];

const maritalStatusData = [
  { name: 'Single', value: 45 },
  { name: 'Married', value: 35 },
  { name: 'Divorced', value: 15 },
  { name: 'Other', value: 5 },
];

const ethnicityData = [
  { 
    name: 'Asian', 
    value: 25, 
    ratio: 25, 
    subgroups: {
      eastAsian: 12,
      southAsian: 8,
      southeastAsian: 5
    },
    growth: 15
  },
  { 
    name: 'Black', 
    value: 20, 
    ratio: 20, 
    subgroups: {
      african: 10,
      caribbean: 7,
      other: 3
    },
    growth: 12
  },
  { 
    name: 'Hispanic', 
    value: 15, 
    ratio: 15, 
    subgroups: {
      central: 6,
      south: 5,
      caribbean: 4
    },
    growth: 18
  },
  { 
    name: 'White', 
    value: 35, 
    ratio: 35, 
    subgroups: {
      european: 20,
      northAmerican: 12,
      other: 3
    },
    growth: 8
  },
  { 
    name: 'Other', 
    value: 5, 
    ratio: 5, 
    subgroups: {
      mixed: 3,
      other: 2
    },
    growth: 10
  }
];

const COLORS = {
  age: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'],
  gender: ['#6C5B7B', '#C06C84', '#F67280', '#F8B195'],
  maritalStatus: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
  ethnicity: ['#355C7D', '#6C5B7B', '#C06C84', '#F67280', '#F8B195']
};

const DemographicInsights = () => {
  return (
    <div className="space-y-6 mb-8">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-center text-[#0FA0CE] mb-6"
      >
        Anonymous Demographic Insights
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-[#0FA0CE]">Age Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={ageData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Total"
                      dataKey="A"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Full-time"
                      dataKey="fulltime"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Part-time"
                      dataKey="parttime"
                      stroke="#ffc658"
                      fill="#ffc658"
                      fillOpacity={0.6}
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-[#0FA0CE]">Gender Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={genderData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8">
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS.gender[index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-[#0FA0CE]">Marital Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={maritalStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {maritalStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS.maritalStatus[index]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-[#0FA0CE]">Ethnicity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <XAxis 
                      dataKey="value" 
                      name="Percentage" 
                      unit="%" 
                      label={{ value: 'Distribution (%)', position: 'bottom' }}
                    />
                    <YAxis 
                      dataKey="growth" 
                      name="Growth" 
                      unit="%" 
                      label={{ value: 'YoY Growth (%)', angle: -90, position: 'insideLeft' }}
                    />
                    <ZAxis 
                      dataKey="ratio" 
                      range={[100, 800]} 
                      name="Representation"
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      content={({ payload }) => {
                        if (payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-2 border border-gray-200 rounded shadow">
                              <p className="font-bold">{data.name}</p>
                              <p>Distribution: {data.value}%</p>
                              <p>Growth: {data.growth}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Scatter
                      name="Ethnicity Distribution"
                      data={ethnicityData}
                      fill="#8884d8"
                    >
                      {ethnicityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS.ethnicity[index]} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DemographicInsights;
