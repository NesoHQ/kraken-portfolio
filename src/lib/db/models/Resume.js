import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  company: { type: String, required: true },
  period:  { type: String, required: true },
  points:  { type: [String], default: [] },
  hidden:  { type: Boolean, default: false },
});

const ProjectSchema = new mongoose.Schema({
  title:  { type: String, required: true },
  period: { type: String, required: true },
  text:   { type: String, required: true },
});

const SkillGroupSchema = new mongoose.Schema({
  category: { type: String, required: true },
  tags:     { type: [String], default: [] },
});

const ResumeSchema = new mongoose.Schema(
  {
    experience:    { type: [ExperienceSchema], default: [] },
    infraProjects: { type: [ProjectSchema], default: [] },
    skills:        { type: [SkillGroupSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
