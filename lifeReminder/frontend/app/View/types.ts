// frontend/app/View/types.ts

export interface Cita {
  id: string;
  tipo: string;
  lugar: string;
  consultorio: string;
  centro: string;        // ← esta propiedad es importante
  fechaHora: string;
  valor: string;
}

export type RootStackParamList = {
  CancelarCita: {
    cita: Cita;
    nombrePaciente: string;
  };
  CitasAgendadas: {
    pacienteId?: string;
    nombrePaciente: string;
  };
  AgendaCita: {
    pacienteId: string;
    nombrePaciente: string;
  };
  MedicinaGeneral: {
    pacienteId: string;
    nombrePaciente: string;
    telefonoPaciente: string;
    emailPaciente: string;
  };
  Odontologia: {
    pacienteId: string;
    nombrePaciente: string;
    telefonoPaciente: string;
    emailPaciente: string;
  };
  SeleccionarServicio: {
  pacienteId: string;
  nombrePaciente: string;
  telefonoPaciente: string;
  emailPaciente: string;
};

};
