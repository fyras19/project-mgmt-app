import React, { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENT } from "../queries/clientQueries";

export const ClientRow: FC<any> = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // refetchQueries: [{ query: GET_CLIENT }],
    update(cache, { data: { deleteClient }}) {
        const { clients }: any = cache.readQuery({ query: GET_CLIENT });
        cache.writeQuery({
            query: GET_CLIENT,
            data: { clients: clients.filter((c: any) => c.id !== deleteClient.id) }
        });
    }
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            deleteClient();
          }}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};
