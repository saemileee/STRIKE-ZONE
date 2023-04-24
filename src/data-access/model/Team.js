import { model } from 'mongoose';
import { TeamSchema } from '../schemas';

const Team = model('teams', TeamSchema);

export { Team };
