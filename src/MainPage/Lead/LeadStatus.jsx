import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useEffect } from 'react';
import httpService from '../../lib/httpService';
import Swal from 'sweetalert2';

function LeadStatus() {
  const [columns, setColumns] = useState({
    ['New Lead']: {
      name: 'New Lead',
      items: [],
      background: '#fff',
      color: '#000',
    },
    ['Cold Lead']: {
      name: 'Cold Lead',
      items: [],
      background: '#EC453A',
      color: '#fff',
    },
    ['Negotiations']: {
      name: 'Negotiations',
      items: [],
      background: '#1DC5CF',
      color: '#fff',
    },
    ['Lead Won']: {
      name: 'Lead Won',
      items: [],
    },
    ['Lead Lost']: {
      name: 'Lead Lost',
      items: [],
    },
  });

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      Swal.fire({
        title: `Confirming updating`,
        text: `Are you sure you want to update the status of ${removed.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Proceed',
        preConfirm: () => {
          return httpService.put(`/lead/${removed._id}`, {
            status: destination.droppableId,
          });
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (
            destination.droppableId === 'Lead Won' ||
            destination.droppableId === 'Lead Lost'
          ) {
            if (destination.droppableId === 'Lead Won')
              await httpService.post(`/customer`, {
                ...removed,
                _id: undefined,
              });
            setColumns({
              ...columns,
              [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems,
              },
            });
            Swal.fire(
              'Status Updated',
              'Leave status has been updated.',
              'success'
            );
            return;
          }

          setColumns({
            ...columns,
            [source.droppableId]: {
              ...sourceColumn,
              items: sourceItems,
            },
            [destination.droppableId]: {
              ...destColumn,
              items: destItems,
            },
          });
          Swal.fire(
            'Status Updated',
            'Leave status has been updated.',
            'success'
          );
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const leads = await httpService.get('/lead');
    if (leads.status === 200) {
      for (let i = 0; i < leads.data.length; i++) {
        setColumns((columns) => ({
          ...columns,
          [leads.data[i].status]: {
            ...columns[leads.data[i].status],
            items: [
              ...columns[leads.data[i].status].items,
              {
                ...leads.data[i],
                id: leads.data[i]._id,
                content: leads.data[i].name,
              },
            ],
          },
        }));
      }
    }
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Lead Status</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Projects</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Lead Status</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#create_project"
              >
                <i className="fa fa-plus" /> Add new lead
              </a>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, minmax(350px, 1fr))',
              gap: 5,
              overflow: 'auto',
              paddingTop: '20px',
              paddingBottom: '20px',
            }}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                  key={columnId}
                >
                  <h4
                    style={{
                      fontWeight: 500,
                    }}
                  >
                    {column.name}
                  </h4>
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? '	#E0E0E0'
                                : '	#E8E8E8',
                              padding: 4,
                              width: 350,
                              minHeight: 600,
                            }}
                          >
                            {column.items?.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          borderRadius: '8px',
                                          userSelect: 'none',
                                          padding: 16,
                                          margin: '0 0 8px 0',
                                          minHeight: '50px',
                                          color: snapshot.isDragging
                                            ? '#000'
                                            : column.color,
                                          backgroundColor: snapshot.isDragging
                                            ? '#f2f2f2'
                                            : column.background,
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {item.content}
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default LeadStatus;
