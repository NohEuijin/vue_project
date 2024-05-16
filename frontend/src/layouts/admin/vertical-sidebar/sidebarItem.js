const sidebarItem = [
  { header: 'Navigation' },
  {
    title: '대쉬보드',
    icon: 'mdi-chart-box-outline',
    to: '/admin/dashboard'
  },
  { header: 'Authentication' },
  {
    title: '로그인',
    icon: 'mdi-login',
    to: '/admin/login'
  },
  {
    title: '회원가입',
    icon: 'mdi-account-plus-outline',
    to: '/admin/register'
  },
  { header: 'Management' },
  {
    title: '상영관',
    icon: 'mdi-television',
    to: '/admin/theater'
  },
  {
    title: '예매 현황',
    icon: 'mdi-clock-outline',
    to: '/admin/ticketing'
  },
  {
    title: '영화 등록',
    icon: 'mdi-movie-minus-outline',
    to: '/admin/mainposter'
  },
  {
    title: '회원 관리',
    icon: 'mdi-card-account-details-outline',
    to: '/admin/membership'
  },
  {
    title: '관리자 관리',
    icon: 'mdi-human-male-board-poll',
    to: '/admin/waitinglist'
  },
  {
    title: '판매/실적',
    icon: 'mdi-hand-coin-outline',
    to: '/admin/sales'
  },
  { header: 'Support' },
  {
    title: '기술/지원',
    icon: 'mdi-wrench-cog',
    to: 'https://protectx.imweb.me/',
    type: 'external',
    chip: 'protect',
    chipColor: 'secondary',
    chipVariant: 'flat'
  },
];

export default sidebarItem;
