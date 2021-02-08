import { Role } from "./role";

export const configureFakeBackend = () => {
  let users = [
    {
      id: 1,
      username: "admin",
      password: "admin",
      firstName: "Admin",
      lastName: "Admin",
      role: Role.Admin,
    },
    {
      id: 2,
      username: "user",
      password: "user",
      firstName: "Normal",
      lastName: "User",
      role: Role.User,
    },
  ];
  window.fetch = function(url, opts) {
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(() => {
        const params = JSON.parse(opts.body);
        const user = users.find(
          (x) =>
            x.username === params.username && x.password === params.password
        );

        if (!user) return error("Username or password is incorrect");

        const { id, username, firstName, lastName, role } = user;
        
        return ok({
          id: id,
          username: username,
          firstName: firstName,
          lastName: lastName,
          role: role,
          token: `fake-jwt-token.${role}`,
        });

        // private helper functions
        function ok(body) {
          resolve({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(body)),
          });
        }

        function error(message) {
          resolve({
            status: 400,
            text: () => Promise.resolve(JSON.stringify({ message })),
          });
        }
      }, 500);
    });
  };
};
