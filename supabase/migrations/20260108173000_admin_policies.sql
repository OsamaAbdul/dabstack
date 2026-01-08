-- Enable RLS for profiles if not already enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can view all profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles"
ON profiles FOR SELECT
USING (
  exists (
    select 1 from user_roles
    where user_roles.user_id = auth.uid()
    and user_roles.role = 'admin'
  )
);

-- Policy: Users can view their own profile (usually exists, but ensuring it)
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING ( auth.uid() = user_id );

-- Policy: Admins can update any profile (optional, for management)
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
CREATE POLICY "Admins can update all profiles"
ON profiles FOR UPDATE
USING (
  exists (
    select 1 from user_roles
    where user_roles.user_id = auth.uid()
    and user_roles.role = 'admin'
  )
);

-- Policy: Admins can view all user_roles
DROP POLICY IF EXISTS "Admins can view all user_roles" ON user_roles;
CREATE POLICY "Admins can view all user_roles"
ON user_roles FOR SELECT
USING (
  exists (
    select 1 from user_roles ur
    where ur.user_id = auth.uid()
    and ur.role = 'admin'
  )
);

-- Policy: Users can view their own role
DROP POLICY IF EXISTS "Users can view own role" ON user_roles;
CREATE POLICY "Users can view own role"
ON user_roles FOR SELECT
USING ( auth.uid() = user_id );

-- Policy: Admins can update roles (promote/demote)
DROP POLICY IF EXISTS "Admins can update user_roles" ON user_roles;
CREATE POLICY "Admins can update user_roles"
ON user_roles FOR UPDATE
USING (
  exists (
    select 1 from user_roles ur
    where ur.user_id = auth.uid()
    and ur.role = 'admin'
  )
);

-- Allow admins to insert roles (e.g. creating new admins manually if needed, or via UI)
DROP POLICY IF EXISTS "Admins can insert user_roles" ON user_roles;
CREATE POLICY "Admins can insert user_roles"
ON user_roles FOR INSERT
WITH CHECK (
  exists (
    select 1 from user_roles ur
    where ur.user_id = auth.uid()
    and ur.role = 'admin'
  )
);
