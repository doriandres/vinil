import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { HOME_PAGE, NOT_FOUND, ADMIN_SIGN_IN, SIGN_IN, ADMIN_LANDING, ADD_SONG, ADMIN_SONGS, SIGN_UP, ADMIN_REQUESTS_USERS, ADMIN_USERS, COLLAB_SIGN_IN, ADMIN_ADD_COLLABORATORS, ADMIN_COLLABORATORS, COLLAB_LANDING, COLLAB_ADD_SONG, COLLAB_PENDING_SONGS, ADMIN_PENDING_SONGS } from '../../locations';
import Loading from "../Loading";
import PrivateRoute from "./components/PrivateRoute";
import { ADMIN, USER, COLLABORATOR } from "../../constants/roles";

const NotFoundPage = lazy(() => import("../NotFoundPage"));
const AdminSignInPage = lazy(() => import("../AdminSignInPage"));
const AdminLandingPage = lazy(() => import("../AdminLandingPage"));
const AdminSongsPage = lazy(() => import("../AdminSongsPage"));
const AddSongPage = lazy(() => import("../AddSongPage"));
const HomePage = lazy(() => import("../HomePage"));
const SignInPage = lazy(() => import("../SignInPage"));
const SignUpPage = lazy(() => import("../SignUpPage"));
const AdminAccessRequestPage = lazy(() => import("../AdminAccessRequestPage"));
const AdminUsers = lazy(() => import("../AdminUsers"));
const CollabSignInPage = lazy(() => import("../CollabSignInPage"));
const AdminAddCollaborator = lazy(() => import("../AdminAddCollaborator"));
const AdminCollaborators = lazy(() => import("../AdminCollaborators"));
const AdminPendingSongs = lazy(() => import("../AdminPendingSongs"));
const CollabLandingPage = lazy(() => import("../CollabLandingPage"));
const CollabAddSongPage = lazy(() => import("../CollabAddSongPage"));
const CollabPendingSongs = lazy(() => import("../CollabPendingSongs"));

export default function ClientRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path={NOT_FOUND()} component={NotFoundPage} />
        <Route exact path={ADMIN_SIGN_IN()} component={AdminSignInPage} />
        <Route exact path={SIGN_IN()} component={SignInPage} />
        <Route exact path={SIGN_UP()} component={SignUpPage} />
        <Route exact path={COLLAB_SIGN_IN()} component={CollabSignInPage} />
        <PrivateRoute exact path={HOME_PAGE()} component={HomePage} roles={[USER]} redirect={SIGN_IN()} />
        <PrivateRoute exact path={ADMIN_LANDING()} component={AdminLandingPage} roles={[ADMIN]} redirect={ADMIN_SIGN_IN()} />
        <PrivateRoute exact path={ADMIN_SONGS()} component={AdminSongsPage} roles={[ADMIN]} redirect={ADMIN_SIGN_IN()} />
        <PrivateRoute exact path={ADD_SONG()} component={AddSongPage} roles={[ADMIN]} redirect={ADMIN_SIGN_IN()} />
        <PrivateRoute exact path={ADMIN_REQUESTS_USERS()} component={AdminAccessRequestPage} roles={[ADMIN]} redirect={ADMIN_SIGN_IN()} />
        <PrivateRoute exact path={ADMIN_USERS()} component={AdminUsers} roles={[ADMIN]} redirect={ADMIN_SIGN_IN()} />
        <PrivateRoute exact path={ADMIN_ADD_COLLABORATORS()} component={AdminAddCollaborator} roles={[ADMIN]} redirect={ADMIN_SIGN_IN()} />
        <PrivateRoute exact path={ADMIN_COLLABORATORS()} component={AdminCollaborators} roles={[ADMIN]} redirect={ADMIN_SIGN_IN()} />
        <PrivateRoute exact path={ADMIN_PENDING_SONGS()} component={AdminPendingSongs} roles={[ADMIN]} redirect={ADMIN_SIGN_IN()} />
        <PrivateRoute exact path={COLLAB_LANDING()} component={CollabLandingPage} roles={[COLLABORATOR]} redirect={COLLAB_SIGN_IN()} />
        <PrivateRoute exact path={COLLAB_ADD_SONG()} component={CollabAddSongPage} roles={[COLLABORATOR]} redirect={COLLAB_SIGN_IN()} />
        <PrivateRoute exact path={COLLAB_PENDING_SONGS()} component={CollabPendingSongs} roles={[COLLABORATOR]} redirect={COLLAB_SIGN_IN()} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </Suspense>
  );
}