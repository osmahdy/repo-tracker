let action = document.querySelector(`.github .action`);
let input = document.querySelector(`.github .action input`);
let serach = document.querySelector(`.github .action button`);
let process = document.querySelector(`.github .process`);
// let reposSection = document.querySelector(`.github .process .repos`);
let err = document.querySelector(`.github .process .err`);

input.addEventListener('keydown', (btn) => {
  if (btn.key === 'Enter') {
    // serach.click();
    gitrepos();
  }
});

serach.addEventListener('click', () => {
  gitrepos();
});

function gitrepos() {
  let username = input.value;
  process.innerHTML = '';
  let err = document.createElement('span');
  let profileSection = document.createElement('div');
  let reposSection = document.createElement('div');
  err.className = 'err';
  profileSection.className = 'profile';
  reposSection.className = 'repos';
  process.appendChild(err);
  process.appendChild(profileSection);
  process.appendChild(reposSection);
  if (username === '') {
    err.textContent = 'Please Enter A Username...';
    err.classList.add('active');
  } else {
    err.classList.remove('active');
    fetch(`https://api.github.com/users/${username}`)
      .then((result) => {
        if (!result.ok) {
          console.log('here');
          throw new Error(' User not found! Please check the username.');
        }
        return result.json();
      })
      .then((result) => {
        console.log('here2');
        let profileSection = document.querySelector(`.github .process .profile`);
        let profileImage = document.createElement('img');
        let div = document.createElement('div');
        let top = document.createElement('div'); //top
        let profileName = document.createElement('span');
        let visitProfile = document.createElement('button');
        let bio = document.createElement('span'); //span bio
        let bottom = document.createElement('div'); //bottom
        let dateCreated = document.createElement('span'); //span date created
        let dateUpdated = document.createElement('span'); //span date updated
        top.className = 'top';
        profileName.className = 'name';
        visitProfile.className = 'visit-profile';
        bio.className = 'bio';
        bottom.className = 'bottom';
        dateCreated.className = 'creation-date';
        dateUpdated.className = 'last-update';

        profileImage.src = result.avatar_url;
        profileName.textContent = result.name;
        visitProfile.textContent = 'Visit Profile';
        if (result.bio) {
          bio.textContent = result.bio;
        } else {
          bio.innerHTML = 'Bio: <br> No Bio Exist';
        }
        dateCreated.textContent = `Created At: ${result.created_at.substring(0, 10)} ${result.created_at.substring(11, 16)}`;
        dateUpdated.textContent = `Last Update: ${result.updated_at.substring(0, 10)} ${result.updated_at.substring(11, 16)}`;

        visitProfile.onclick = () => {
          window.open(`https://github.com/${username}`, '_blank');
        };
        top.appendChild(profileName);
        top.appendChild(visitProfile);
        div.appendChild(top);
        div.appendChild(bio);
        bottom.appendChild(dateCreated);
        bottom.appendChild(dateUpdated);
        div.appendChild(bottom);
        profileSection.appendChild(profileImage);
        profileSection.appendChild(div);
        return fetch(`https://api.github.com/users/${username}/repos`);
      })
      .then((responce) => {
        if (!responce.ok) {
          throw new Error(' User not found! Please check the username.');
        }
        return responce.json();
      })
      .then((data) => {
        data.forEach((rp, index) => {
          let repo = document.createElement('div');
          let number = document.createElement('span');
          let name = document.createElement('span');
          let visit = document.createElement('button');

          repo.className = 'repo';
          number.className = 'number';
          name.className = 'name';
          number.textContent = `${index + 1}.`;
          name.textContent = `${data[index].name}.`;
          visit.textContent = `visit`;
          repo.appendChild(number);
          repo.appendChild(name);
          repo.appendChild(visit);
          reposSection.appendChild(repo);
          visit.onclick = () => {
            window.open(data[index].html_url, '_blank');
          };
        });
      });
    // .catch((error) => {
    //   err.textContent = 'The Username Is Wrong Or Not Exist';
    //   err.classList.add('active');
    // });
  }
}


let footerYear = document.querySelector(`footer .year`);
let date = new Date();
footerYear.textContent = date.getFullYear();
