import React, { useRef, useState } from 'react';

import '../styles/pages/leads.css';

interface Lead {
  id: number;
  text: string;
  state: 1 | 2 | 3;
}

function Leads() {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      text: 'Org. Internacionais',
      state: 1,
    },
    {
      id: 2,
      text: 'Ind. Farm. LTDA',
      state: 2,
    },
    {
      id: 3,
      text: 'Musc. Sound Live Cmp',
      state: 1,
    },
  ]);
  const [nextId, setNextId] = useState(4);
  const inputNewLeadRef = useRef<HTMLInputElement>(null);
  const trNewLeadRef = useRef<HTMLTableRowElement>(null);

  const allowDrop = (event: React.DragEvent<HTMLTableDataCellElement>) => {
    event.preventDefault();
  };

  const drag = (ev: any) => {
    ev.dataTransfer.setData('lead', ev.target.id);
  };

  const drop = (event: React.DragEvent<HTMLTableDataCellElement>) => {
    const tdId = event.currentTarget.id;
    const [, rowId, columnStage] = tdId.split('_');
    const leadIndex = Number(event.dataTransfer.getData('lead'));
    const lead = leads[leadIndex];

    if (Number(columnStage) === lead.state + 1 && lead.id === Number(rowId)) {
      const newLeads = [...leads];
      newLeads[leadIndex].state += 1;

      setLeads(newLeads);
    }

    event.preventDefault();
  };

  const handleNewInput = () => {
    const input = inputNewLeadRef.current;
    if (input) {
      input.value = '';
    }

    const tr = trNewLeadRef.current;
    if (tr) {
      tr.style.display = 'table-row';
    }

    inputNewLeadRef.current?.focus();
  };

  const addNewLead = (leadText: string) => {
    if (leadText) {
      const newLead: Lead = {
        id: nextId,
        state: 1,
        text: leadText,
      };
      setNextId(nextId + 1);

      setLeads([...leads, newLead]);
    }

    const tr = trNewLeadRef.current;
    if (tr) {
      tr.style.display = 'none';
    }
  };

  return (
    <div id='leads'>
      <div className='container'>
        <div className='header'>
          <div className='imageContainer'>
            <img
              src='https://elogroup.com.br/wp-content/uploads/2020/09/logo-EloGroup-branco.png'
              alt='Elo Group'
            />
          </div>
          <h1 className='title'>Painel de Leads</h1>
        </div>
        <button onClick={handleNewInput} className='newLead'>
          Novo Lead (+)
        </button>
        <table>
          <thead>
            <tr>
              <td>Cliente em Potencial</td>
              <td>Dados Confirmados</td>
              <td>Reunião Agendada</td>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => {
              return (
                <tr key={lead.id}>
                  <td id={`td_${lead.id}_1`}>
                    {lead.state === 1 && (
                      <span
                        id={`${index}`}
                        draggable
                        className='tdContent'
                        onDragStart={drag}
                      >
                        {lead.text}
                      </span>
                    )}
                  </td>
                  <td
                    id={`td_${lead.id}_2`}
                    onDragOver={allowDrop}
                    onDrop={drop}
                  >
                    {lead.state === 2 && (
                      <span
                        id={`${index}`}
                        draggable
                        className='tdContent'
                        onDragStart={drag}
                      >
                        {lead.text}
                      </span>
                    )}
                  </td>
                  <td
                    id={`td_${lead.id}_3`}
                    onDragOver={allowDrop}
                    onDrop={drop}
                  >
                    {lead.state === 3 && (
                      <span
                        id={`${index}`}
                        draggable
                        className='tdContent'
                        onDragStart={drag}
                      >
                        {lead.text}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
            <tr style={{ display: 'none' }} ref={trNewLeadRef}>
              <td>
                <input
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.currentTarget.blur();
                    }
                  }}
                  onBlur={(event) => {
                    const value = event.target.value;

                    addNewLead(value);
                  }}
                  ref={inputNewLeadRef}
                  type='text'
                />
              </td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leads;
