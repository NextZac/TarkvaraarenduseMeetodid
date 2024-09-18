export type Form = {
  course_name: String;
  name: String;
  feedback: {
    type: String;
    required: true;
  };
  ratings: {
    type: CourseFeedback[];
    required: true;
  };
};

export type CourseFeedback = {
  name: String;
  feedback: Number;
};
