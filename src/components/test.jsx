import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
  } from 'recharts';
  
  const calorieData = [
    { date: 'May 1', calories: 1950 },
    { date: 'May 2', calories: 1800 },
    { date: 'May 3', calories: 2000 },
    { date: 'May 4', calories: 1750 },
    { date: 'May 5', calories: 2100 },
    { date: 'May 6', calories: 1900 },
    { date: 'May 7', calories: 1850 },
    { date: 'May 8', calories: 1700 },
    { date: 'May 9', calories: 1800 },
    { date: 'May 10', calories: 2000 },
    { date: 'May 11', calories: 1700 },
    { date: 'May 12', calories: 2200 },
    { date: 'May 13', calories: 1900 },
    { date: 'May 14', calories: 1750 },
  ];
  
  const weightData = [
    { date: 'Week 1', weight: 70 },
    { date: 'Week 2', weight: 69.5 },
    { date: 'Week 3', weight: 68.8 },
    { date: 'Week 4', weight: 68.2 },
    { date: 'Week 5', weight: 67.9 },
    { date: 'Week 6', weight: 67.5 },
  ];
  
  const macroData = [
    { name: 'Carbs', value: 45 },
    { name: 'Protein', value: 35 },
    { name: 'Fats', value: 20 },
  ];
  
  const streakData = [
    { date: 'May 1', logged: 1 },
    { date: 'May 2', logged: 1 },
    { date: 'May 3', logged: 1 },
    { date: 'May 4', logged: 0 },
    { date: 'May 5', logged: 1 },
    { date: 'May 6', logged: 1 },
    { date: 'May 7', logged: 1 },
    { date: 'May 8', logged: 0 },
    { date: 'May 9', logged: 1 },
    { date: 'May 10', logged: 1 },
    { date: 'May 11', logged: 0 },
    { date: 'May 12', logged: 1 },
    { date: 'May 13', logged: 1 },
    { date: 'May 14', logged: 1 },
  ];
  
  
  const COLORS = ['#00C49F', '#0088FE', '#FFBB28'];
  
  const AnalyticsDashboard = () => {
    return (
      <div className="space-y-8 max-w-4xl mx-auto p-4">
        {/* Daily Calorie Intake */}
        <div>
          <h2 className="text-lg font-bold mb-2">Daily Calorie Intake</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={calorieData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis unit=" kcal" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="calories" stroke="#00C49F" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
  
        {/* Weight Progress */}
        <div>
          <h2 className="text-lg font-bold mb-2">Weight Progress</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis unit=" kg" />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
  
        {/* Macro Breakdown */}
        <div>
          <h2 className="text-lg font-bold mb-2">Macro Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={macroData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {macroData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
  
        {/* Logging Streak */}
        <div>
          <h2 className="text-lg font-bold mb-2">Daily Logging Streak</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={streakData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis ticks={[0, 1]} />
              <Tooltip />
              <Bar dataKey="logged" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  export default AnalyticsDashboard;
  