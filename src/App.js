import React from 'react'
import { FormInput, FormGroup, Form, Header, Select, Grid, GridRow, GridColumn, Checkbox, Button, Modal, ModalContent, ModalDescription, ModalActions, ModalHeader } from 'semantic-ui-react'
import './App.css'
import { usePDF } from 'react-to-pdf';

const tipoDemanda = [
  { key: '1', value: '1', text: 'Espontanea' },
  { key: '2', value: '2', text: 'Agendada' },
];

const professionals = [
  { key: '1', value: 'Doutor(a) Amanda', text: 'Doutor(a) Amanda' },
  { key: '2', value: 'Técnico(a) Bruno', text: 'Técnico(a) Bruno' },
  { key: '3', value: 'Enfermeiro(a) Carlos', text: 'Enfermeiro(a) Carlos' },
  { key: '4', value: 'Doutor(a) Danilo', text: 'Doutor(a) Danilo' },
  { key: '5', value: 'Enfermeiro(a) Eduardo', text: 'Enfermeiro(a) Eduardo' },
  { key: '6', value: 'Técnico(a) Fernanda', text: 'Técnico(a) Fernanda' },
  { key: '7', value: 'Doutor(a) Gabriel', text: 'Doutor(a) Gabriel' },
  { key: '8', value: 'Dentista Igor', text: 'Dentista Igor' },
  { key: '9', value: 'Dentista João', text: 'Dentista João' },
  { key: '10', value: 'Técnico(a) Maria', text: 'Técnico(a) Maria' },
];

const patientsInitialValue = [
  { key: '1', value: 'Pedro Bezerra', text: 'Pedro Bezerra' },
  { key: '2', value: 'Maria Nunes', text: 'Maria Nunes' },
  { key: '3', value: 'José da Silva', text: 'José da Silva' },
  { key: '4', value: 'João Neto', text: 'João Neto' }
];

function App() {
  const [open, setOpen] = React.useState(false)
  const [professional, setProfessional] = React.useState();
  const [patients, setPatients] = React.useState([]);
  const [modalRegisterPatient, setModalRegisterPatient] = React.useState(false);
  const [newPatientName, setNewPatientName] = React.useState('');
  const [selectedPatient, setSelectedPatient] = React.useState('');

  const handleNewPatientName = (e) => {
    setNewPatientName(e.target.value);
  }

  const handleRegisterPatient = () => {
    const pat = JSON.parse(localStorage.getItem('patients'));
    const key = pat.length + 1;
    const newData = JSON.stringify([...pat, { key: key, value: newPatientName, text: newPatientName }]);
    localStorage.setItem('patients', newData);
    setSelectedPatient(newPatientName);
    setModalRegisterPatient(false);
  }
  const { targetRef, toPDF } = usePDF({
    filename: `${professional}.pdf`,
    page: {
      margin: 20
    }
  });

  const handleGeneratePdf = () => {
    toPDF();
  }

  const handleSetProfessional = (e) => {
    setProfessional(e.target.value);
  }

  const handleReload = () => {
    window.location.reload();
    localStorage.setItem('professional', professional)
    setOpen(false)
  };

  const handleReloadPatients = () => {
    setPatients(JSON.parse(localStorage.getItem('patients')));
  }

  React.useEffect(() => {
    const prof = localStorage.getItem('professional');
    setProfessional(prof);

    const pat = JSON.parse(localStorage.getItem('patients'));

    console.log(pat)

    if (!pat || pat.length === 0) {
      localStorage.setItem('patients', JSON.stringify(patientsInitialValue));
    }

    setPatients(pat);
  }, [selectedPatient]);

  return (
    <div ref={targetRef}>
      <Header as='h1' content='Prontuário eletrônico' textAlign='center' />
      <br />
      <Form>
        <FormGroup>
          <FormInput label='Atendente' placeholder='Atendente' width={16} value={professional} onChange={handleSetProfessional} />
        </FormGroup>
        <FormGroup>
          <Grid divided='vertically'>
            <GridRow columns={1}>
              <GridColumn>
                <Header as='h5' content='Paciente' />
                <Select id='patientSelect' labeled placeholder='Selecione' options={patients} width={12} onClick={handleReloadPatients} value={selectedPatient} />
              </GridColumn>
            </GridRow>
          </Grid>

          <Modal
            open={modalRegisterPatient}
            trigger={<Button primary className='button ml-64' content='Novo' onClick={() => setModalRegisterPatient(true)} />}
            header='Cadastro de cidadão'
            content={
              <Form className='mr-16'>
                <FormGroup>
                  <FormInput label='Nome completo' placeholder='Nome completo' width={8} onChange={handleNewPatientName} />
                  <FormInput label='CPF' placeholder='CPF' width={4} type='number' />
                  <FormInput label='Data de nascimento' placeholder='Data de nascimento' width={4} type='date' />
                </FormGroup>
                <br />
                <FormGroup>
                  <FormInput label='CEP' placeholder='CEP' width={4} type='number' />
                  <FormInput label='Rua' placeholder='Rua' width={6} />
                  <FormInput label='Número' placeholder='Número' width={4} type='number' />
                </FormGroup>
                <FormGroup>
                  <FormInput label='Bairro' placeholder='Bairro' />
                  <FormInput label='Cidade' placeholder='Cidade' width={6} />
                  <FormInput label='Estado' placeholder='Estado' width={4} />
                </FormGroup>
                <br />
                <FormGroup>
                  <FormInput label='Nome completo da mãe' placeholder='Nome completo da mãe' width={12} />
                  <FormInput label='Nome completo do pai' placeholder='Nome completo do pai' width={12} />
                </FormGroup>
                <FormGroup className='center'>
                  <Button primary onClick={handleRegisterPatient}>Cadastrar</Button>
                  <Button onClick={() => setModalRegisterPatient(false)}>Cancelar</Button>
                </FormGroup>
              </Form>
            }
          />


          <FormInput label='CPF' placeholder='CPF' width={4} type='number' />
          <FormInput label='Data de nascimento' placeholder='Data de nascimento' width={4} type='date' />
        </FormGroup>
        <br />
        <FormGroup>
          <FormInput label='Data da consulta' placeholder='Data da consulta' width={4} type='date' />
          <FormInput label='Endereço' placeholder='Endereço' width={12} />
        </FormGroup>
        <br />
        <FormGroup>
          <FormInput label='Nome completo da mãe' placeholder='Nome completo da mãe' width={12} />
          <FormInput label='Nome completo do pai' placeholder='Nome completo do pai' width={12} />
        </FormGroup>
      </Form>
      <br />
      <Grid divided='vertically'>
        <GridRow columns={2}>
          <GridColumn>
            <Header content='Tipo de demanda' />
            <Select labeled placeholder='Selecione' options={tipoDemanda} width={12} />
          </GridColumn>
          <GridColumn>
            <Header content='Profissional' />
            <Select labeled placeholder='Selecione' options={professionals} width={12} />
          </GridColumn>
        </GridRow>
      </Grid>
      <br />
      <Header as='h1' content='Tipos de serviço' />
      <Grid className='ml-16 mt-8'>
        <GridRow columns={1}>
          <GridColumn>
            <Checkbox label='Adm. Medicamento' className='mr-8' />
            <Checkbox label='Curativo' className='mr-8' />
            <Checkbox label='Exame' className='mr-8' />
            <Checkbox label='Limpeza' className='mr-8' />
            <Checkbox label='Escuta inicial' className='mr-8' />
            <Checkbox label='Demanda espotânea' className='mr-8' />
          </GridColumn>
          <br /><br />
          <GridColumn>
            <Checkbox label='Procedimentos' className='mr-8' />
            <Checkbox label='Vacina' className='mr-8' />
            <Checkbox label='Nebulização' className='mr-8' />
            <Checkbox label='Odontologia' className='mr-8' />
            <Checkbox label='Triagem' className='mr-8' />
            <Checkbox label='Outros' className='mr-8' />
          </GridColumn>
        </GridRow>
      </Grid>
      <br />
      <Modal
        centered={false}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<center><Button content='Concluir' className='mb-32' primary onClick={handleGeneratePdf} /></center >}
        size='small'
      >
        <ModalHeader>Cadastro de atendimento</ModalHeader>
        <ModalContent>
          <ModalDescription>
            Atendimento cadastrado com sucesso
          </ModalDescription>
        </ModalContent>
        <ModalActions>
          <Button primary onClick={handleReload}>OK</Button>
        </ModalActions>
      </Modal>
    </div>
  );
}

export default App;
