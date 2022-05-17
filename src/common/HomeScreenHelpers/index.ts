const stringAvatar = (name: string | null) => {
  return name ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : 'U';
};

export default stringAvatar;
