const sidebarItem = [
  { header: 'Navigation' },
  {
    title: 'Dashboard',
    icon: 'mdi-chart-box-outline',
    to: '/admin/dashboard'
  },
  { header: 'Authentication' },
  {
    title: 'Login',
    icon: 'mdi-login',
    to: '/admin/login'
  },
  {
    title: 'Register',
    icon: 'mdi-account-plus-outline',
    to: '/admin/register'
  },
  { header: 'Management' },
  {
    title: 'Theater',
    icon: 'mdi-television',
    to: '/admin/theater'
  },
  {
    title: 'Schedule',
    icon: 'mdi-clock-outline',
    to: '/admin/schedule'
  },
  {
    title: 'MainPoster',
    icon: 'mdi-movie-minus-outline',
    to: '/admin/mainposter'
  },
  {
    title: 'MemberShip',
    icon: 'mdi-card-account-details-outline',
    to: '/admin/membership'
  },
  {
    title: 'WaitingAdminList',
    icon: 'mdi-human-male-board-poll',
    to: '/admin/waitinglist'
  },
  {
    title: 'Sales',
    icon: 'mdi-hand-coin-outline',
    to: '/admin/sales'
  },
  { header: 'Support' },
  {
    title: 'Technology',
    icon: 'mdi-wrench-cog',
    to: 'https://protectx.imweb.me/',
    type: 'external',
    chip: 'protect',
    chipColor: 'secondary',
    chipVariant: 'flat'
  },
];

export default sidebarItem;
