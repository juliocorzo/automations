import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  OutlinedInput,
  Skeleton,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DashboardLayout from '@/components/layouts/dashboard';
import { useCreateTodoMutation, useGetTodosByUserQuery, useDeleteTodoByIdMutation } from '@/store/todos';
import { LoadingButton } from '@mui/lab';
import { DateTime } from 'luxon';

function Todos() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createTitle, setCreateTitle] = useState('');
  const [createDescription, setCreateDescription] = useState('');
  const [createDueDate, setCreateDueDate] = useState<DateTime | null>(null);

  const { user } = useRouter().query;

  const {
    data: todos,
    error,
    isLoading,
  } = useGetTodosByUserQuery(user as string);

  const [
    createTodo,
    { isLoading: createLoading, isError: createError },
  ] = useCreateTodoMutation();

  const [
    deleteTodo,
  ] = useDeleteTodoByIdMutation();

  return (
    <DashboardLayout title="RTK Query & Next.js API Demo">
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" marginTop={4}>
          Todos
        </Typography>
        <Button
          variant="outlined"
          color="success"
          sx={{ marginTop: 2 }}
          onClick={() => setCreateModalOpen(true)}
        >
          Create Todo
        </Button>
        <Modal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 800,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              pt: 2,
              px: 4,
              pb: 3,
            }}
          >
            <Typography variant="h4" component="h1" marginTop={3} marginBottom={5} textAlign="center">
              Create Todo
            </Typography>
            <Grid container sx={{ direction: 'column', justifyContent: 'space-between' }}>
              <Grid item xs={2}>
                <Typography variant="h6" component="h2" sx={{ lineHeight: 3 }}>
                  Title
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <OutlinedInput
                  fullWidth
                  required
                  value={createTitle}
                  onChange={(e) => setCreateTitle(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid marginTop={3} container sx={{ direction: 'column', justifyContent: 'space-between' }}>
              <Grid item xs={2}>
                <Typography variant="h6" component="h2" sx={{ lineHeight: 3 }}>
                  Description
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <OutlinedInput
                  fullWidth
                  required
                  value={createDescription}
                  onChange={(e) => setCreateDescription(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid marginTop={3} container sx={{ direction: 'column', justifyContent: 'space-between' }}>
              <Grid item xs={2}>
                <Typography variant="h6" component="h2" sx={{ lineHeight: 3 }}>
                  Due Date
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <DatePicker
                  value={createDueDate}
                  onChange={(date) => setCreateDueDate(date)}
                />
              </Grid>
              <Grid item xs={12} marginTop={4}>
                <LoadingButton
                  size="large"
                  fullWidth
                  variant="contained"
                  color="primary"
                  loading={createLoading}
                  onClick={() => {
                    createTodo({
                      user: user as string,
                      title: createTitle,
                      description: createDescription,
                      duedate: createDueDate?.toISO() as string,
                    });
                    setCreateModalOpen(false);
                  }}
                >
                  Submit
                </LoadingButton>
              </Grid>
            </Grid>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {createError}
            </Typography>
          </Box>
        </Modal>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="left"
          alignItems="flex-start"
          marginTop={2}
        >
          {isLoading && (
            [1, 2, 3, 4, 5, 6, 7, 8].map((todo) => (
              <Grid item xs={3} key={todo}>
                <Typography variant="h6" component="h2">
                  <Skeleton width="40%" />
                </Typography>
                <Typography variant="body1" component="p">
                  <Skeleton />
                </Typography>
                <Typography variant="caption" component="p">
                  <Skeleton />
                </Typography>
                <Typography variant="caption" component="p">
                  <Skeleton />
                </Typography>
              </Grid>
            ))
          )}
          {!isLoading && !error && todos && todos?.map((todo) => (
            <Grid item xs={3} key={todo.id}>
              <Typography variant="h6" component="h2">
                {todo.title}
              </Typography>
              <Typography variant="body1" component="p">
                {todo.description}
              </Typography>
              <Typography variant="caption" component="p">
                Due: {todo.duedate.toLocaleString()}
              </Typography>
              <Typography variant="caption" component="p">
                Completed: {todo.completed ? 'Yes' : 'No'}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteTodo({ id: todo.id })}
              >
                Delete
              </Button>
            </Grid>
          ))}
          {createLoading && (
            <Grid item xs={3}>
              <Typography variant="h6" component="h2">
                <Skeleton width="40%" />
              </Typography>
              <Typography variant="body1" component="p">
                <Skeleton />
              </Typography>
              <Typography variant="caption" component="p">
                <Skeleton />
              </Typography>
              <Typography variant="caption" component="p">
                <Skeleton />
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </DashboardLayout>
  );
}

export { Todos };
export default Todos;
