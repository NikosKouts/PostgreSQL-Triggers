PGDMP     *    ;                 z            heklll #   12.9 (Ubuntu 12.9-0ubuntu0.20.04.1) #   12.9 (Ubuntu 12.9-0ubuntu0.20.04.1) 4    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    17266    heklll    DATABASE     x   CREATE DATABASE heklll WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE heklll;
                postgres    false            ?            1255    17267    f_before_delete_professor()    FUNCTION     ?  CREATE FUNCTION public.f_before_delete_professor() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	--Update Courses Table
	DELETE FROM courses
	WHERE OLD.id_pk_fk = professor_id_fk;
	
	--Update Universities Table
	IF(SELECT d_university FROM delete_university) = 0 THEN
		UPDATE  universities
		SET professors = professors - 1
		WHERE (SELECT university_fk FROM members WHERE OLD.id_pk_fk = id_pk) = name_pk;
	END IF;
	
	RETURN OLD;
END;
$$;
 2   DROP FUNCTION public.f_before_delete_professor();
       public          postgres    false            ?            1255    17268    f_before_delete_student()    FUNCTION       CREATE FUNCTION public.f_before_delete_student() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	--Update Attends Table
	DELETE FROM attends
	WHERE OLD.id_pk_fk = student_id_pk_fk AND 
			(SELECT university_fk FROM members WHERE OLD.id_pk_fk = id_pk) = university_name_pk_fk;
	
	--Update Universities Table
	IF(SELECT d_university FROM delete_university) = 0 THEN
		UPDATE  universities
		SET students = students - 1
		WHERE (SELECT university_fk FROM members WHERE OLD.id_pk_fk = id_pk) = name_pk;
	END IF;
	
	RETURN OLD;
END;
$$;
 0   DROP FUNCTION public.f_before_delete_student();
       public          postgres    false            ?            1255    17269    f_delete_course()    FUNCTION     ?  CREATE FUNCTION public.f_delete_course() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	--Update Attends Table
	DELETE FROM attends
	WHERE OLD.id_pk = course_id_pk_fk AND OLD.university_pk_fk = university_name_pk_fk;
	
	--Update Universities Table
	IF(SELECT d_university FROM delete_university) = 0 THEN
		UPDATE  universities
		SET courses = courses - 1
		WHERE OLD.university_pk_fk = name_pk;
	END IF;
	
	RETURN OLD;
END;
$$;
 (   DROP FUNCTION public.f_delete_course();
       public          postgres    false            ?            1255    17270    f_delete_member()    FUNCTION     ?   CREATE FUNCTION public.f_delete_member() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	--Update Members Table
	DELETE FROM members
	WHERE id_pk = OLD.id_pk_fk;

	RETURN OLD;
END;
$$;
 (   DROP FUNCTION public.f_delete_member();
       public          postgres    false            ?            1255    17271    f_delete_university()    FUNCTION     3  CREATE FUNCTION public.f_delete_university() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	--Update Delete_university
	UPDATE delete_university
	SET d_university = 1;

	--Update Students Table
	DELETE FROM students
	WHERE OLD.name_pk IN (SELECT university_fk FROM members WHERE students.id_pk_fk = id_pk);
	
	--Update Professors Table
	DELETE FROM professors
	WHERE OLD.name_pk IN (SELECT university_fk FROM members WHERE professors.id_pk_fk = id_pk);
	
	--Update Delete_university
	UPDATE delete_university
	SET d_university = 0;
	
	RETURN OLD;
END;
$$;
 ,   DROP FUNCTION public.f_delete_university();
       public          postgres    false            ?            1255    17272    f_insert_course()    FUNCTION     ?   CREATE FUNCTION public.f_insert_course() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	--Update Universities Table
	UPDATE universities
	SET courses = courses + 1
	WHERE NEW.university_pk_fk = name_pk;

	RETURN NEW;
END;
$$;
 (   DROP FUNCTION public.f_insert_course();
       public          postgres    false            ?            1255    17273    f_insert_professor()    FUNCTION     ?  CREATE FUNCTION public.f_insert_professor() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	-- Member Insert
	INSERT INTO members VALUES (NEW.id_pk, NEW.university_fk, NEW.first_name, NEW.last_name, NEW.email, NEW.phone);
	
	-- Professor Insert
	INSERT INTO professors VALUES (NEW.id_pk, NEW.experience, NEW.salary, NEW.specialty);
	
	--Update Universities Table
	UPDATE universities
	SET professors = professors + 1
	WHERE NEW.university_fk = name_pk;
	
	RETURN NEW;
END;
$$;
 +   DROP FUNCTION public.f_insert_professor();
       public          postgres    false            ?            1255    17274    f_insert_student()    FUNCTION     ?  CREATE FUNCTION public.f_insert_student() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	-- Member Insert
	INSERT INTO members VALUES (NEW.id_pk, NEW.university_fk, NEW.first_name, NEW.last_name, NEW.email, NEW.phone);
	
	-- Student Insert
	INSERT INTO students VALUES (NEW.id_pk, NEW.student_id, NEW.semester, NEW.gpa);
	
	--Update Universities Table
	UPDATE universities
	SET students = students + 1
	WHERE NEW.university_fk = name_pk;
	
	RETURN NEW;
END;
$$;
 )   DROP FUNCTION public.f_insert_student();
       public          postgres    false            ?            1259    17275    attends    TABLE     ?   CREATE TABLE public.attends (
    student_id_pk_fk character varying(64) NOT NULL,
    course_id_pk_fk character varying(64) NOT NULL,
    university_name_pk_fk character varying(64) NOT NULL
);
    DROP TABLE public.attends;
       public         heap    postgres    false            ?            1259    17278    courses    TABLE     ?   CREATE TABLE public.courses (
    id_pk character varying(64) NOT NULL,
    university_pk_fk character varying(64) NOT NULL,
    professor_id_fk character varying(64) NOT NULL,
    name character varying(64) NOT NULL
);
    DROP TABLE public.courses;
       public         heap    postgres    false            ?            1259    17281    delete_university    TABLE     W   CREATE TABLE public.delete_university (
    d_university integer DEFAULT 0 NOT NULL
);
 %   DROP TABLE public.delete_university;
       public         heap    postgres    false            ?            1259    17285    members    TABLE     $  CREATE TABLE public.members (
    id_pk character varying(64) NOT NULL,
    university_fk character varying(64) NOT NULL,
    first_name character varying(64) NOT NULL,
    last_name character varying(64) NOT NULL,
    email character varying(64) NOT NULL,
    phone character varying(16)
);
    DROP TABLE public.members;
       public         heap    postgres    false            ?            1259    17288 
   professors    TABLE     ?   CREATE TABLE public.professors (
    id_pk_fk character varying(64) NOT NULL,
    experience integer NOT NULL,
    salary integer NOT NULL,
    specialty character varying(64) NOT NULL
);
    DROP TABLE public.professors;
       public         heap    postgres    false            ?            1259    17291    members_disjoint_professors    VIEW     3  CREATE VIEW public.members_disjoint_professors AS
 SELECT members.id_pk,
    members.university_fk,
    members.first_name,
    members.last_name,
    members.email,
    members.phone,
    professors.experience,
    professors.salary,
    professors.specialty
   FROM public.members,
    public.professors;
 .   DROP VIEW public.members_disjoint_professors;
       public          postgres    false    205    205    205    205    205    205    206    206    206            ?            1259    17295    students    TABLE     	  CREATE TABLE public.students (
    id_pk_fk character varying(64) NOT NULL,
    student_id character varying(64) NOT NULL,
    semester integer NOT NULL,
    gpa double precision NOT NULL,
    CONSTRAINT students_gpa_check CHECK ((gpa >= (0)::double precision))
);
    DROP TABLE public.students;
       public         heap    postgres    false            ?            1259    17299    members_disjoint_students    VIEW     %  CREATE VIEW public.members_disjoint_students AS
 SELECT members.id_pk,
    members.university_fk,
    members.first_name,
    members.last_name,
    members.email,
    members.phone,
    students.student_id,
    students.semester,
    students.gpa
   FROM public.members,
    public.students;
 ,   DROP VIEW public.members_disjoint_students;
       public          postgres    false    208    208    208    205    205    205    205    205    205            ?            1259    17303    universities    TABLE     ?  CREATE TABLE public.universities (
    name_pk character varying(64) NOT NULL,
    country character varying(64) NOT NULL,
    region character varying(64) NOT NULL,
    professors integer NOT NULL,
    students integer NOT NULL,
    courses integer NOT NULL,
    CONSTRAINT universities_courses_check CHECK ((courses >= 0)),
    CONSTRAINT universities_professors_check CHECK ((professors >= 0)),
    CONSTRAINT universities_students_check CHECK ((students >= 0))
);
     DROP TABLE public.universities;
       public         heap    postgres    false            ?          0    17275    attends 
   TABLE DATA           [   COPY public.attends (student_id_pk_fk, course_id_pk_fk, university_name_pk_fk) FROM stdin;
    public          postgres    false    202   ?N       ?          0    17278    courses 
   TABLE DATA           Q   COPY public.courses (id_pk, university_pk_fk, professor_id_fk, name) FROM stdin;
    public          postgres    false    203   O       ?          0    17281    delete_university 
   TABLE DATA           9   COPY public.delete_university (d_university) FROM stdin;
    public          postgres    false    204   zO       ?          0    17285    members 
   TABLE DATA           \   COPY public.members (id_pk, university_fk, first_name, last_name, email, phone) FROM stdin;
    public          postgres    false    205   ?O       ?          0    17288 
   professors 
   TABLE DATA           M   COPY public.professors (id_pk_fk, experience, salary, specialty) FROM stdin;
    public          postgres    false    206   RP       ?          0    17295    students 
   TABLE DATA           G   COPY public.students (id_pk_fk, student_id, semester, gpa) FROM stdin;
    public          postgres    false    208   ?P       ?          0    17303    universities 
   TABLE DATA           _   COPY public.universities (name_pk, country, region, professors, students, courses) FROM stdin;
    public          postgres    false    210   ?P       <           2606    17310    attends attends_pkey 
   CONSTRAINT     ?   ALTER TABLE ONLY public.attends
    ADD CONSTRAINT attends_pkey PRIMARY KEY (student_id_pk_fk, course_id_pk_fk, university_name_pk_fk);
 >   ALTER TABLE ONLY public.attends DROP CONSTRAINT attends_pkey;
       public            postgres    false    202    202    202            >           2606    17312    courses courses_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id_pk, university_pk_fk);
 >   ALTER TABLE ONLY public.courses DROP CONSTRAINT courses_pkey;
       public            postgres    false    203    203            @           2606    17314    members members_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_email_key UNIQUE (email);
 C   ALTER TABLE ONLY public.members DROP CONSTRAINT members_email_key;
       public            postgres    false    205            B           2606    17316    members members_phone_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_phone_key UNIQUE (phone);
 C   ALTER TABLE ONLY public.members DROP CONSTRAINT members_phone_key;
       public            postgres    false    205            D           2606    17318    members members_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id_pk);
 >   ALTER TABLE ONLY public.members DROP CONSTRAINT members_pkey;
       public            postgres    false    205            F           2606    17320    professors professors_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.professors
    ADD CONSTRAINT professors_pkey PRIMARY KEY (id_pk_fk);
 D   ALTER TABLE ONLY public.professors DROP CONSTRAINT professors_pkey;
       public            postgres    false    206            H           2606    17322    students students_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id_pk_fk);
 @   ALTER TABLE ONLY public.students DROP CONSTRAINT students_pkey;
       public            postgres    false    208            J           2606    17324    universities universities_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.universities
    ADD CONSTRAINT universities_pkey PRIMARY KEY (name_pk);
 H   ALTER TABLE ONLY public.universities DROP CONSTRAINT universities_pkey;
       public            postgres    false    210            T           2620    17325 #   professors t_after_delete_professor    TRIGGER     ?   CREATE TRIGGER t_after_delete_professor AFTER DELETE ON public.professors FOR EACH ROW EXECUTE FUNCTION public.f_delete_member();
 <   DROP TRIGGER t_after_delete_professor ON public.professors;
       public          postgres    false    206    214            W           2620    17326    students t_after_delete_student    TRIGGER     ~   CREATE TRIGGER t_after_delete_student AFTER DELETE ON public.students FOR EACH ROW EXECUTE FUNCTION public.f_delete_member();
 8   DROP TRIGGER t_after_delete_student ON public.students;
       public          postgres    false    208    214            U           2620    17327 $   professors t_before_delete_professor    TRIGGER     ?   CREATE TRIGGER t_before_delete_professor BEFORE DELETE ON public.professors FOR EACH ROW EXECUTE FUNCTION public.f_before_delete_professor();
 =   DROP TRIGGER t_before_delete_professor ON public.professors;
       public          postgres    false    206    211            X           2620    17328     students t_before_delete_student    TRIGGER     ?   CREATE TRIGGER t_before_delete_student BEFORE DELETE ON public.students FOR EACH ROW EXECUTE FUNCTION public.f_before_delete_student();
 9   DROP TRIGGER t_before_delete_student ON public.students;
       public          postgres    false    208    212            R           2620    17329    courses t_delete_course    TRIGGER     w   CREATE TRIGGER t_delete_course BEFORE DELETE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.f_delete_course();
 0   DROP TRIGGER t_delete_course ON public.courses;
       public          postgres    false    203    213            Z           2620    17330     universities t_delete_university    TRIGGER     ?   CREATE TRIGGER t_delete_university BEFORE DELETE ON public.universities FOR EACH ROW EXECUTE FUNCTION public.f_delete_university();
 9   DROP TRIGGER t_delete_university ON public.universities;
       public          postgres    false    210    215            S           2620    17331    courses t_insert_course    TRIGGER     v   CREATE TRIGGER t_insert_course AFTER INSERT ON public.courses FOR EACH ROW EXECUTE FUNCTION public.f_insert_course();
 0   DROP TRIGGER t_insert_course ON public.courses;
       public          postgres    false    203    216            V           2620    17332 .   members_disjoint_professors t_insert_professor    TRIGGER     ?   CREATE TRIGGER t_insert_professor INSTEAD OF INSERT ON public.members_disjoint_professors FOR EACH ROW EXECUTE FUNCTION public.f_insert_professor();
 G   DROP TRIGGER t_insert_professor ON public.members_disjoint_professors;
       public          postgres    false    217    207            Y           2620    17333 *   members_disjoint_students t_insert_student    TRIGGER     ?   CREATE TRIGGER t_insert_student INSTEAD OF INSERT ON public.members_disjoint_students FOR EACH ROW EXECUTE FUNCTION public.f_insert_student();
 C   DROP TRIGGER t_insert_student ON public.members_disjoint_students;
       public          postgres    false    209    218            K           2606    17334 :   attends attends_course_id_pk_fk_university_name_pk_fk_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.attends
    ADD CONSTRAINT attends_course_id_pk_fk_university_name_pk_fk_fkey FOREIGN KEY (course_id_pk_fk, university_name_pk_fk) REFERENCES public.courses(id_pk, university_pk_fk);
 d   ALTER TABLE ONLY public.attends DROP CONSTRAINT attends_course_id_pk_fk_university_name_pk_fk_fkey;
       public          postgres    false    202    203    2878    203    202            L           2606    17339 %   attends attends_student_id_pk_fk_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.attends
    ADD CONSTRAINT attends_student_id_pk_fk_fkey FOREIGN KEY (student_id_pk_fk) REFERENCES public.students(id_pk_fk);
 O   ALTER TABLE ONLY public.attends DROP CONSTRAINT attends_student_id_pk_fk_fkey;
       public          postgres    false    202    208    2888            M           2606    17344 $   courses courses_professor_id_fk_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_professor_id_fk_fkey FOREIGN KEY (professor_id_fk) REFERENCES public.professors(id_pk_fk);
 N   ALTER TABLE ONLY public.courses DROP CONSTRAINT courses_professor_id_fk_fkey;
       public          postgres    false    203    2886    206            N           2606    17349 %   courses courses_university_pk_fk_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_university_pk_fk_fkey FOREIGN KEY (university_pk_fk) REFERENCES public.universities(name_pk);
 O   ALTER TABLE ONLY public.courses DROP CONSTRAINT courses_university_pk_fk_fkey;
       public          postgres    false    2890    210    203            O           2606    17354 "   members members_university_fk_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_university_fk_fkey FOREIGN KEY (university_fk) REFERENCES public.universities(name_pk);
 L   ALTER TABLE ONLY public.members DROP CONSTRAINT members_university_fk_fkey;
       public          postgres    false    205    2890    210            P           2606    17359 #   professors professors_id_pk_fk_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.professors
    ADD CONSTRAINT professors_id_pk_fk_fkey FOREIGN KEY (id_pk_fk) REFERENCES public.members(id_pk);
 M   ALTER TABLE ONLY public.professors DROP CONSTRAINT professors_id_pk_fk_fkey;
       public          postgres    false    205    2884    206            Q           2606    17364    students students_id_pk_fk_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_id_pk_fk_fkey FOREIGN KEY (id_pk_fk) REFERENCES public.members(id_pk);
 I   ALTER TABLE ONLY public.students DROP CONSTRAINT students_id_pk_fk_fkey;
       public          postgres    false    2884    208    205            ?   0   x?3?tuv5?,-??2C0?AL#0??L?????&?9DČ???? nxC      ?   O   x?suv5?,-??4?,K,N?,?ruv5?AE?@B??? 1cU`!de?P?
???A|?I >T??
?)%1z\\\ c)A      ?      x?3?????? S ?      ?   ?   x?eλ?0??9~??$v.?ҧ? ?J??}?b#?R??tl?>V???9?r????\D??????Fba~9???i%&?$!F?H??$&%?+?Ѕ?#?؍CBR?KL?8d,"??????®?z?"?!K,?)??????G?I?ɺV7??Ib?<?/ ??Y_s      ?   ?   x?3?4?4400?ttr?229?@<'g.cNsNc??ŕ˄ӂ???qqu??B???qqq ??      ?   4   x???  ??^1?(
?b?u8??Ú6I?n?(B?]W??8??:A?I@n      ?   G   x?K????.?,???L/JMMN?,?(J???4 A?Ғ?xjqqbN%?1?p%bJ??efgp?	W? ???     