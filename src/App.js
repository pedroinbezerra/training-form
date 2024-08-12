import React from 'react'
import { FormInput, FormGroup, Form, Header, Select, Grid, GridRow, GridColumn, Checkbox, Button, Modal, ModalContent, ModalDescription, ModalActions, ModalHeader } from 'semantic-ui-react'
import './App.css'

const tipoDemanda = [
  { key: '1', value: '1', text: 'Espontanea' },
  { key: '2', value: '2', text: 'Agendada' },
]

const professionals = [
  { key: '1', value: 'Amanda', text: 'Amanda' },
  { key: '2', value: 'Bruno', text: 'Bruno' },
  { key: '3', value: 'Carlos', text: 'Carlos' },
  { key: '4', value: 'Danilo', text: 'Danilo' },
  { key: '5', value: 'Eduardo', text: 'Eduardo' },
  { key: '6', value: 'Fernanda', text: 'Fernanda' },
  { key: '7', value: 'Gabriel', text: 'Gabriel' },
  { key: '8', value: 'Igor', text: 'Igor' },
  { key: '9', value: 'João', text: 'João' },
  { key: '10', value: 'Maria', text: 'Maria' },
]

const Register = () => {
  return (
    <Form className='mr-16'>
      <FormGroup>
        <FormInput label='Nome completo' placeholder='Nome completo' width={8} />
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
    </Form>
  )
}

function App() {
  const [open, setOpen] = React.useState(false)

  const handleReload = () => {
    window.location.reload();
    setOpen(false)
  };

  return (
    <>
      <Header as='h1' content='Prontuário eletrônico' textAlign='center' />
      <br />
      <Form>
        <FormGroup>
          <FormInput label='Nome completo' placeholder='Nome completo' width={8} />

          <Modal
            trigger={<Button primary className='button' content='Novo' />}
            header='Cadastro de cidadão'
            content={<Register />}
            actions={['Cancelar', { key: 'done', content: 'Cadastrar', positive: true }]}
          />


          <FormInput label='CPF' placeholder='CPF' width={4} type='number' />
          <FormInput label='Data de nascimento' placeholder='Data de nascimento' width={4} type='date' />
        </FormGroup>
        <br />
        <FormGroup>
          <FormInput label='Data da consulta' placeholder='Data da consulta' width={4} type='date' />
          <FormInput label='Endereço' placeholder='Endereço' width={12} type='number' />
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
        trigger={<center><Button content='Concluir' primary /></center >}
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
    </>
  );
}

export default App;
