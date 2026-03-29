import React from 'react'

import { ClipboardList, MessageSquare, BookOpen } from "lucide-react";
import { useSelector } from "react-redux";
import WelcomeHeader from '../components/WelcomeHeader';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <div>

      <WelcomeHeader
        name={user?.name || "Student"}
        subtitle="Continue your learning journey"
        buttonText="Ask a Doubt"
        onClick={() => console.log("Ask Doubt")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <StatCard
          title="Class"
          value={`${user?.className}th`}
          subtitle="+6 this week"
          icon={< ClipboardList className="text-blue-600" />}
          bgColor="bg-blue-100"
        />

        <StatCard
          title="Doubts Posted"
          value="2"
          subtitle="0 resolved"
          icon={<MessageSquare className="text-purple-600" />}
          bgColor="bg-purple-100"
        />

        <StatCard
          title="Subjects"
          value="6"
          subtitle="Active learning"
          icon={<BookOpen className="text-green-600" />}
          bgColor="bg-green-100"
        />

      </div>

    </div>
  );
};

export default Dashboard;
