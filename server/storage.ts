import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  skills, type Skill, type InsertSkill,
  contacts, type Contact, type InsertContact
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Expanded IStorage interface with all CRUD operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project operations
  getProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Skill operations
  getSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  getSkill(id: number): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  
  // Contact operations
  getContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Project operations
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.created_at));
  }
  
  async getProjectsByCategory(category: string): Promise<Project[]> {
    return await db.select()
      .from(projects)
      .where(eq(projects.category, category))
      .orderBy(desc(projects.created_at));
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select()
      .from(projects)
      .where(eq(projects.id, id));
    return project || undefined;
  }
  
  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }
  
  // Skill operations
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }
  
  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return await db.select()
      .from(skills)
      .where(eq(skills.category, category));
  }
  
  async getSkill(id: number): Promise<Skill | undefined> {
    const [skill] = await db.select()
      .from(skills)
      .where(eq(skills.id, id));
    return skill || undefined;
  }
  
  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [skill] = await db
      .insert(skills)
      .values(insertSkill)
      .returning();
    return skill;
  }
  
  // Contact operations
  async getContacts(): Promise<Contact[]> {
    return await db.select()
      .from(contacts)
      .orderBy(desc(contacts.created_at));
  }
  
  async getContact(id: number): Promise<Contact | undefined> {
    const [contact] = await db.select()
      .from(contacts)
      .where(eq(contacts.id, id));
    return contact || undefined;
  }
  
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }
}

export const storage = new DatabaseStorage();
