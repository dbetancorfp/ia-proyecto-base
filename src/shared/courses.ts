export interface Course {
  id: number
  name: string
  short: string
}

export const TARGET_COURSES: Course[] = [
  { id: 83943,  name: '25-26 1DAW - SSF - Sistemas Informáticos',               short: 'SSF'      },
  { id: 85540,  name: '25-26 2DAW - DEW - Desarrollo web entorno cliente',       short: 'DEW 2DAW' },
  { id: 100266, name: '25-26 2DAWs - DEW - Desarrollo web entorno cliente',      short: 'DEW 2DAWs'},
  { id: 98988,  name: '25-26 1DAWs - DJK - Digitalización sectores productivos', short: 'DJK'      },
  { id: 114600, name: '25-26 2DAWs - CI4 - Proyecto Intermodular DAW',           short: 'CI4 2DAWs'},
  { id: 114466, name: '25-26 2DAW - CI4 - PRW - Proyecto',                       short: 'PRW'      },
]
