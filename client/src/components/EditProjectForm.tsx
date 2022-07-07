import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

type Props = {
  project: {
    id: string;
    name: string;
    description: string;
    status: string;
    client: {
      id: string;
      name: string;
      email: string;
      phone: string;
    };
  };
};

const EditProjectForm = ({ project }: Props) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("");

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name,
      description,
      status,
    },
    refetchQueries: [{ query: GET_PROJECTS, variables: { id: project.id } }],
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields");
    }

    updateProject();
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Project Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description">Project Description</label>
          <textarea
            className="form-control"
            id="description"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status">Project Status</label>
          <select
            className="form-control"
            id="status"
            defaultValue={project.status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Project
        </button>
      </form>
    </div>
  );
};

export default EditProjectForm;
