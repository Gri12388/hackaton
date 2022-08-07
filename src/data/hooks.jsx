import { useNavigate } from "react-router-dom";
import { hosts } from "./data.js";


export function useCourseClick() {
  const navigate = useNavigate();
  return async function() {
    try {
      const response = await fetch(hosts.javaHost + '/api/allCourse', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          mode: 'no-cors',
          referrerPolicy: "unsafe-url",
        },
      });

      const result = await response.json();
      localStorage.setItem('courses', JSON.stringify(result));
      navigate('/courses');
    }
    catch (err) {
      console.error(err);
    }
  }
}