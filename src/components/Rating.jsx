import { useState, useEffect } from 'react';
import './Rating.css';

const Rating = ({ id }) => {
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [hasRated, setHasRated] = useState(false);

  const userId = 'user-' + Math.random().toString(36).substring(2, 9);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/ratings/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch rating');
        }
        const data = await response.json();
        setRating(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRating();
    }
  }, [id]);

  const handleSubmit = async () => {
    if (!id || submitting || userRating < 1) return;

    setSubmitting(true);
    setFeedback(null);
    try {
      // First update server
      const postResponse = await fetch(`/api/ratings/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({ rating: userRating }),
      });

      if (!postResponse.ok) {
        throw new Error('Failed to submit rating');
      }

      // Then refetch to get updated average
      const getResponse = await fetch(`/api/ratings/${id}`);
      if (!getResponse.ok) {
        throw new Error('Failed to fetch updated rating');
      }
      const data = await getResponse.json();
      setRating(data);
      setHasRated(true);
      setFeedback({ type: 'success', message: 'Thanks for your rating!' });
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!id || submitting || userRating < 1) return;

    setSubmitting(true);
    setFeedback(null);
    try {
      const putResponse = await fetch(`/api/ratings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({ rating: userRating }),
      });

      if (!putResponse.ok) {
        throw new Error('Failed to update rating');
      }

      const getResponse = await fetch(`/api/ratings/${id}`);
      if (!getResponse.ok) {
        throw new Error('Failed to fetch updated rating');
      }
      const data = await getResponse.json();
      setRating(data);
      setFeedback({ type: 'success', message: 'Rating updated!' });
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!id || submitting) return;

    setSubmitting(true);
    setFeedback(null);
    try {
      const deleteResponse = await fetch(`/api/ratings/${id}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': userId,
        },
      });

      if (!deleteResponse.ok) {
        throw new Error('Failed to delete rating');
      }

      const getResponse = await fetch(`/api/ratings/${id}`);
      if (!getResponse.ok) {
        throw new Error('Failed to fetch updated rating');
      }
      const data = await getResponse.json();
      setRating(data);
      setHasRated(false);
      setUserRating(0);
      setFeedback({ type: 'success', message: 'Rating removed.' });
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="rating-loading">Loading...</div>;
  }

  if (error) {
    return <div className="rating-error">{error}</div>;
  }

  return (
    <div className="rating-container">
      <div className="rating-card">
        <h2>Rate This Product</h2>

        <div className="rating-summary">
          <div className="rating-number">{rating?.value?.toFixed(1) || '0.0'}</div>
          <div className="rating-stars">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={i < Math.round(rating?.value || 0) ? 'filled' : 'empty'}>
                ★
              </span>
            ))}
          </div>
          <div className="rating-count">{rating?.count || 0} reviews</div>
        </div>

        <div className="rating-form">
          <p className="form-label">Your rating:</p>
          <div className="star-selector">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star-btn ${userRating >= star ? 'active' : ''}`}
                onClick={() => {
                  setUserRating(star);
                  setFeedback(null);
                }}
                disabled={submitting}
                aria-label={`${star} star${star > 1 ? 's' : ''}`}
              >
                ★
              </button>
            ))}
          </div>

          {!feedback && (
            <div className="form-actions">
              <button
                type="button"
                className="btn-submit"
                onClick={handleSubmit}
                disabled={submitting}
              >
                Submit Rating
              </button>
              {hasRated && (
                <>
                  <button
                    type="button"
                    className="btn-update"
                    onClick={handleUpdate}
                    disabled={submitting}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={handleDelete}
                    disabled={submitting}
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          )}

          {feedback && (
            <div className={`feedback-message ${feedback.type}`}>
              {feedback.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rating;
