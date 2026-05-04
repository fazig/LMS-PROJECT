import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="card course-card card-tilt">
      {course.thumbnail && (
        <div className="course-thumb">
          <img src={course.thumbnail} alt={course.title} loading="lazy" />
        </div>
      )}
      <h3>{course.title}</h3>
      <p className="subtle">{course.description}</p>
      <div className="course-meta">
        <span className="badge">{course.category}</span>
        <span className="subtle">${course.price ?? 0}</span>
      </div>
      <div className="inline-actions">
        <Link className="button button-primary" to={`/courses/${course._id}`}>
          View Details
        </Link>
        {course.youtubeLink && (
          <a
            className="button button-secondary"
            href={course.youtubeLink}
            target="_blank"
            rel="noreferrer"
          >
            Watch on YouTube
          </a>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
