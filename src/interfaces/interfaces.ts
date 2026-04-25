import { z } from 'zod';

export const nacionalSelect = [
  {
    id: 1,
    nombre: 'Cali',
    value: 'cali'
  },
  {
    id: 2,
    nombre: 'Armenia',
    value: 'armenia'
  },
  {
    id: 3,
    nombre: 'Ibagué',
    value: 'ibague'
  },
  {
    id: 4,
    nombre: 'Bogotá',
    value: 'bogota'
  },
  {
    id: 5,
    nombre: 'Bucaramanga',
    value: 'bucaramanga'
  },
  {
    id: 6,
    nombre: 'Montería',
    value: 'monteria'
  },
  {
    id: 7,
    nombre: 'Barranquilla',
    value: 'barranquilla'
  },
  {
    id: 8,
    nombre: 'Quibdó',
    value: 'quibdo'
  },
];

export const regionalSelect = [
  {
    id: 1,
    nombre: 'Bello',
    value: 'bello'
  },
  {
    id: 2,
    nombre: 'Rionegro',
    value: 'rionegro'
  },
  {
    id: 3,
    nombre: 'Occidente',
    value: 'occidente'
  },
  {
    id: 4,
    nombre: 'Valdivia',
    value: 'valdivia'
  },
  {
    id: 5,
    nombre: 'Segovia',
    value: 'segovia'
  },
];

export const urbanoSelect = [
  {
    id: 1,
    nombre: 'Poblado',
    value: 'poblado'
  },
  {
    id: 2,
    nombre: 'Centro',
    value: 'centro'
  },
  {
    id: 3,
    nombre: 'Belén',
    value: 'belen'
  },
  {
    id: 4,
    nombre: 'Estádio',
    value: 'estadio'
  },
  {
    id: 5,
    nombre: 'San Javier',
    value: 'sanJavier'
  },
  {
    id: 6,
    nombre: 'Robledo',
    value: 'robledo'
  },
  {
    id: 7,
    nombre: 'Laureles',
    value: 'laureles'
  },
  {
    id: 8,
    nombre: 'Buenos Aires',
    value: 'buenosAires'
  },
];

//*Schema y types de Cargue Operativos
const operativoCargueSchema = z.object({
  id: z.string(),
  operativo: z.string(),
  nombreOperativo: z.string(),
  tipoOperativo: z.string(),
  nombreConductor: z.string(),
  placa: z.string(),
  reporteIngreso: z.string(),
  fechaHoraIngreso: z.string(),
  enBodega: z.boolean().nullable(),
  muelleCargue: z.string(),
  precintoSalida: z.string(),
  manifiestoCargue: z.string(),
  gpsCargue: z.string(),
  estadoGpsCargue: z.string(),
  fechaHoraSalida: z.string(),
  reporteSalida: z.string(),
  novedad: z.string(),
});

export const ingresoOperativoCargueStateReducerSchema = z.array(operativoCargueSchema)
export type IngresoOperativoCargueForm = z.infer<typeof operativoCargueSchema>;
export type DespachoOperativoCargueForm = Pick<IngresoOperativoCargueForm, 'muelleCargue' | 'precintoSalida' | 'manifiestoCargue' | 'gpsCargue' | 'estadoGpsCargue' | 'fechaHoraSalida' | 'reporteSalida' | 'novedad'>;
export type IngresoOperativoCargueProps = z.infer<typeof operativoCargueSchema>;
export type IngresoOperativoCarguePayload = z.infer<typeof operativoCargueSchema>;
export type IngresoOperativoCargueStateReducer = z.infer<typeof ingresoOperativoCargueStateReducerSchema>;



//*Schema y types de descargue operativo
const operativoDescargueSchema = z.object({
  id: z.string(),
  operativo: z.string(),
  nombreOperativo: z.string(),
  tipoOperativo: z.string(),
  nombreConductor: z.string(),
  placa: z.string(),
  reporteIngreso: z.string(),
  fechaHoraIngreso: z.string(),
  enBodega: z.boolean(),
  manifiestoDescargue: z.string(),
  gpsDescargue: z.string(),
  estadoGPSDescargue: z.string(),
  fechaHoraSalida: z.string(),
  novedad: z.string(),
  precintoDescargue: z.string(),
  muelleDescargue: z.string(),
});

export const operativoDescargueStateReducer = z.array(operativoDescargueSchema);

export type IngresoOperativoDescargueForm = z.infer<typeof operativoDescargueSchema>;
export type IngresoOperativoDescarguePayload = z.infer<typeof operativoDescargueSchema>;
export type OperativoDescargueStateReducer = z.infer<typeof operativoDescargueStateReducer>
export type IngresoOperativoDescargueProps = z.infer<typeof operativoDescargueSchema>;
export type DespachoOperativoSinCargaForm = Pick<IngresoOperativoDescargueForm, 'novedad'>;

//*Schema y types urbanos
export const urbanoCargueSchema = operativoCargueSchema.pick({
  id: true,
  operativo: true,
  nombreConductor: true,
  placa: true,
  muelleCargue: true,
  novedad: true,
  enBodega: true,
  fechaHoraIngreso: true,
  fechaHoraSalida: true,
}).extend({
  zona: z.string(),
  asignacion: z.string(),
  plantilla: z.string(),
});

export const urbanoDescargueSchema = operativoCargueSchema.pick({
  id: true,
  operativo: true,
  nombreConductor: true,
  placa: true,
  novedad: true,
  enBodega: true,
  fechaHoraIngreso: true,
  fechaHoraSalida: true,
}).extend({
  zona: z.string(),
  muelleDescargue: z.string()
});


export const urbanoCargueStateReducer = z.array(urbanoCargueSchema);
export const urbanoDescargueStateReducer = z.array(urbanoDescargueSchema);

export type IngresoUrbanoCargueForm = z.infer<typeof urbanoCargueSchema>;
export type IngresoUrbanoCargueProps = z.infer<typeof urbanoCargueSchema>;
export type IngresoUrbanoCarguePayload = z.infer<typeof urbanoCargueSchema>;
export type UrbanoCargueStateReducer = z.infer<typeof urbanoCargueStateReducer>
export type DespachoUrbanoCargueForm = Pick<IngresoUrbanoCargueForm, 'asignacion' | 'plantilla' | 'novedad'>;

export type IngresoUrbanoDescargueForm = z.infer<typeof urbanoDescargueSchema>;
export type IngresoUrbanoDescargueProps = z.infer<typeof urbanoDescargueSchema>
export type IngresoUrbanoDescarguePayload = z.infer<typeof urbanoDescargueSchema>;
export type UrbanoDescargueStateReducer = z.infer<typeof urbanoDescargueStateReducer>
export type DespachoUrbanoDescargueForm = Pick<IngresoUrbanoDescargueForm, 'novedad'>;

export interface InitialForm {
  operativo: string,
  objetivo: string,
  fecha: Date,
}