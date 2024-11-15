// SchedulerWrapper.js
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import TaskScheduler from './TaskScheduler';

function SchedulerWrapper() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { date } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (date) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        setCurrentDate(parsedDate);
      } else {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        navigate(`/${formattedDate}`, { replace: true });
      }
    } else {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      navigate(`/${formattedDate}`, { replace: true });
    }
  }, [date, navigate]);

  return (
    <>
      <Navbar currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <TaskScheduler selectedDate={currentDate} />
    </>
  );
}

export default SchedulerWrapper;