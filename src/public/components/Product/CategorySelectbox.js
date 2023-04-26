import { fetchData } from '/js/api/api.js';

export const updateTeamOptions = async teamSelectBox => {
  const teams = await fetchData('/teams');
  const options = teams
    .map(team => `<option value=${team.teamId}>${team.teamName}</option>`)
    .join('');
  teamSelectBox.innerHTML = `<option selected>팀을 선택해 주세요.</option>${options}`;
};

export const updateCategoryOptions = async (teamId, categorySelectBox) => {
  const categories = await fetchData(`/teams/${teamId}/categories`);
  const options = categories
    .map(category => `<option value='${category}'>${category}</option>`)
    .join('');
  categorySelectBox.innerHTML = `<option selected>카테고리를 선택해 주세요.</option>${options}`;
};
