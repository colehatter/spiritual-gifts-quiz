import { GiftName } from '@/types/quiz';

interface CareerMatch {
  roles: string[];
  description: string;
}

export const careerMatches: Record<GiftName, CareerMatch> = {
  Mercy: {
    roles: ['Counselor', 'Chaplain', 'Social worker', 'Hospice or hospital care', 'Crisis intervention', 'Pastoral care', 'Support ministry leader'],
    description: 'You do your best work in roles where emotional presence and empathy are the job — not a bonus.',
  },
  Shepherding: {
    roles: ['Pastor', 'Life group leader', 'Mentor or coach', 'Discipleship director', 'Small group coordinator', 'School counselor', 'People-focused team manager'],
    description: 'You thrive where you\'re responsible for someone\'s long-term growth, not just a single interaction.',
  },
  Hospitality: {
    roles: ['Events coordinator', 'Guest services', 'Church welcome team', 'Community outreach', 'Retreat director', 'Care environments'],
    description: 'You\'re wired to make people feel like they belong — any role that puts you in that position is your zone.',
  },
  Teaching: {
    roles: ['Pastor or Bible teacher', 'Curriculum developer', 'Educator or trainer', 'Writer or content creator', 'Coach or professor'],
    description: 'You come alive when you\'re helping people understand something they couldn\'t see before.',
  },
  Encouragement: {
    roles: ['Life coach', 'Youth pastor', 'Speaker or mentor', 'HR or people development', 'Ministry leader', 'Chaplain'],
    description: 'Your greatest contribution is often the moment someone decides not to quit — and that can happen in almost any role.',
  },
  Administration: {
    roles: ['Church administrator', 'Executive director', 'Operations manager', 'Project manager', 'Ministry coordinator', 'Systems designer'],
    description: 'You bring order where there is chaos — organizations that are growing fast need you badly.',
  },
  Leadership: {
    roles: ['Senior pastor', 'Executive or entrepreneur', 'Nonprofit director', 'Ministry founder', 'Strategic planner', 'Team lead'],
    description: 'You\'re most useful at the front — casting vision, making decisions, and taking responsibility for outcomes.',
  },
  Service: {
    roles: ['Behind-the-scenes ministry', 'Volunteer coordinator', 'Logistics or facilities', 'Technical ministry', 'Production support'],
    description: 'Your gift isn\'t invisible — it\'s foundational. The mission doesn\'t move without people like you.',
  },
  Giving: {
    roles: ['Fundraiser or development director', 'Stewardship pastor', 'Business owner', 'Financial advisor', 'Philanthropist'],
    description: 'You\'re not just generous — you\'re strategic about it. Roles that let you deploy resources for Kingdom impact are where you thrive.',
  },
  Evangelism: {
    roles: ['Outreach pastor', 'Missionary', 'Church planter', 'Campus ministry', 'Community engagement director'],
    description: 'You\'re wired to initiate. You go toward people others wait for — and that instinct is rare and needed.',
  },
  Faith: {
    roles: ['Prayer ministry leader', 'Missionary', 'Church planter', 'Pioneer ministry roles', 'Faith-driven startup founder'],
    description: 'You function best in environments where the outcome isn\'t guaranteed — where trust in God isn\'t optional but essential.',
  },
};
