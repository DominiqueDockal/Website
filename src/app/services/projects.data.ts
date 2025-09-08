import { Project } from '../models/project.interface';

export const PROJECTS_DATA: Project[] = [
    {
    id: 'pollo-loco',
    name: 'El Pollo Loco',
    technologies: ['HTML', 'CSS', 'JavaScript'], 
    image: 'assets/images/PolloLoco.png',
    descriptionKey: 'projects.pollo-loco.description',
    icons: [
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.9999 19.4136L17.5112 17.9064L18.2544 9.7728H8.45219L8.20883 7.068H18.4989L18.7697 4.4148H5.23012L5.98881 12.4284H15.3174L15.0061 15.8676L11.9999 16.668L8.99377 15.8676L8.80529 13.6548H6.09737L6.48984 17.9076L11.9999 19.4136ZM1.26367 0H22.7362L20.8001 21.6L11.9999 24L3.19978 21.6L1.26367 0Z" fill="var(--main-violet)"/></svg>',
        
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00185 0.00422903C2.00185 0.0972677 1.99769 0.160703 2.00185 0.224138C2.16002 1.98341 2.31818 3.74269 2.47219 5.5062C2.68863 8.00132 2.90091 10.4964 3.11735 12.9873C3.36292 15.787 3.61266 18.5824 3.84991 21.382C3.86656 21.585 3.93732 21.6738 4.12462 21.7245C6.7885 22.4688 9.44405 23.2174 12.1079 23.9574C12.2869 24.0082 12.5033 24.0167 12.6823 23.9659C15.3545 23.2216 18.0226 22.4646 20.6947 21.7161C20.8987 21.6569 20.9695 21.5638 20.9861 21.3524C21.0694 20.2951 21.1693 19.2336 21.2608 18.1764C21.4148 16.4255 21.5647 14.6747 21.7187 12.9239C21.8977 10.8686 22.0808 8.81752 22.2598 6.76222C22.393 5.23131 22.5345 3.70463 22.6677 2.17372C22.7301 1.45479 22.7842 0.735851 22.8425 0H2.00185V0.00422903Z" fill="var(--main-violet)"/></svg>',
        
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0C8.0054 0 15.9946 0 24 0C24 8.0054 24 16.0108 24 24C16.0108 24 8.0054 24 0 24C0 15.9784 0 7.9892 0 0ZM21.472 12.7049C20.9858 11.8298 20.3214 11.2302 19.3653 11.0196C18.6847 10.8575 18.0041 10.8575 17.3234 11.0034C15.1195 11.4571 14.1796 14.1148 15.6057 15.8812C16.108 16.497 16.7725 16.8697 17.4693 17.1938C18.0851 17.4855 18.7171 17.761 19.3329 18.0689C19.7542 18.2795 19.9325 18.6685 19.8839 19.1384C19.8352 19.6084 19.5111 19.8677 19.106 20.0135C18.1985 20.3376 17.1452 20.0459 16.5294 19.2843C16.3997 19.1222 16.2701 18.944 16.1404 18.7657C15.5246 19.1222 14.9251 19.4625 14.3255 19.819C14.6982 20.5483 15.2167 21.1317 15.9298 21.5206C17.1452 22.185 18.4254 22.2822 19.738 21.9581C20.5969 21.7475 21.3261 21.3099 21.7799 20.5159C22.6226 19.0088 22.1364 17.129 20.6455 16.2053C19.9811 15.8001 19.2357 15.5246 18.5388 15.1681C18.1985 14.9899 17.842 14.8278 17.5503 14.6009C17.0317 14.1796 17.129 13.3369 17.7124 13.0128C18.2795 12.6887 19.0736 12.8832 19.5111 13.4504C19.6084 13.5638 19.6732 13.6934 19.7704 13.8231C20.3214 13.4504 20.8886 13.0777 21.472 12.7049Z" fill="var(--main-violet)"/></svg>'
        ],
    githubUrl: 'https://github.com/DominiqueDockal/El-Pollo-Loco',
    liveUrl: 'https://el-pollo-loco.dominique-dockal.de'
    },
    {
    id: 'project2',
    name: 'P2',
    technologies: ['XYZ', 'abc', 'ABC'],
    image: 'assets/images/project_placeholder.png',
    descriptionKey: 'projects.project2.description',
    icons: [
      `<svg width="24" height="24" viewBox="699 741 396 341"xmlns="http://www.w3.org/2000/svg">
          <path d="M705.5 1078.5 897 748.5 1088.5 1078.5Z" stroke="#042433" stroke-width="6.875" stroke-miterlimit="8" fill="#CF3DB6" fill-rule="evenodd"/>
        </svg>
        `,

        `<svg width="24" height="24" viewBox="699 741 396 341"xmlns="http://www.w3.org/2000/svg">
          <path d="M705.5 1078.5 897 748.5 1088.5 1078.5Z" stroke="#042433" stroke-width="6.875" stroke-miterlimit="8" fill="#CF3DB6" fill-rule="evenodd"/>
        </svg>
        `,

        `<svg width="24" height="24" viewBox="699 741 396 341"xmlns="http://www.w3.org/2000/svg">
          <path d="M705.5 1078.5 897 748.5 1088.5 1078.5Z" stroke="#042433" stroke-width="6.875" stroke-miterlimit="8" fill="#CF3DB6" fill-rule="evenodd"/>
        </svg>
        `
    ],
  githubUrl: 'https://github.com/DominiqueDockal',
  liveUrl: '#'
  },
  {
    id: 'project3',
    name: 'P3',
    technologies: ['XYZ', 'abc', 'ABC'],
    image: 'assets/images/project_placeholder.png',
    descriptionKey: 'projects.project3.description',
    icons: [
      `<svg width="24" height="24" viewBox="699 741 396 341"xmlns="http://www.w3.org/2000/svg">
          <path d="M705.5 1078.5 897 748.5 1088.5 1078.5Z" stroke="#042433" stroke-width="6.875" stroke-miterlimit="8" fill="#CF3DB6" fill-rule="evenodd"/>
        </svg>
        `,

        `<svg width="24" height="24" viewBox="699 741 396 341"xmlns="http://www.w3.org/2000/svg">
          <path d="M705.5 1078.5 897 748.5 1088.5 1078.5Z" stroke="#042433" stroke-width="6.875" stroke-miterlimit="8" fill="#CF3DB6" fill-rule="evenodd"/>
        </svg>
        `,

        `<svg width="24" height="24" viewBox="699 741 396 341"xmlns="http://www.w3.org/2000/svg">
          <path d="M705.5 1078.5 897 748.5 1088.5 1078.5Z" stroke="#042433" stroke-width="6.875" stroke-miterlimit="8" fill="#CF3DB6" fill-rule="evenodd"/>
        </svg>
        `
    ],
  githubUrl: 'https://github.com/DominiqueDockal',
  liveUrl: '#'
  }
];
