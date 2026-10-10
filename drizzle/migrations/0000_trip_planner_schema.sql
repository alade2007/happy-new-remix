CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own profile select" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL DEFAULT auth.uid(),
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','planned','archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX itineraries_user_idx ON public.itineraries(user_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.itineraries TO authenticated;
GRANT ALL ON public.itineraries TO service_role;
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own itineraries select" ON public.itineraries FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Own itineraries insert" ON public.itineraries FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own itineraries update" ON public.itineraries FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own itineraries delete" ON public.itineraries FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.waypoint_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id UUID NOT NULL REFERENCES public.itineraries(id) ON DELETE CASCADE,
  day_number INT NOT NULL CHECK (day_number BETWEEN 1 AND 30),
  position_index INT NOT NULL CHECK (position_index >= 0),
  title TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('stay','tour','transit')),
  cost_tier TEXT NOT NULL DEFAULT 'balanced' CHECK (cost_tier IN ('budget','balanced','premium')),
  affiliate_url TEXT
);
CREATE INDEX waypoint_items_itin_idx ON public.waypoint_items(itinerary_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.waypoint_items TO authenticated;
GRANT ALL ON public.waypoint_items TO service_role;
ALTER TABLE public.waypoint_items ENABLE ROW LEVEL SECURITY;
CREATE OR REPLACE FUNCTION public.owns_itinerary(_itinerary UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.itineraries WHERE id = _itinerary AND user_id = auth.uid())
$$;
CREATE POLICY "Own waypoints select" ON public.waypoint_items FOR SELECT TO authenticated USING (public.owns_itinerary(itinerary_id));
CREATE POLICY "Own waypoints insert" ON public.waypoint_items FOR INSERT TO authenticated WITH CHECK (public.owns_itinerary(itinerary_id));
CREATE POLICY "Own waypoints update" ON public.waypoint_items FOR UPDATE TO authenticated USING (public.owns_itinerary(itinerary_id)) WITH CHECK (public.owns_itinerary(itinerary_id));
CREATE POLICY "Own waypoints delete" ON public.waypoint_items FOR DELETE TO authenticated USING (public.owns_itinerary(itinerary_id));