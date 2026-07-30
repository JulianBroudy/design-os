/**
 * Editor state management for the Design System Editor.
 *
 * Uses useReducer + Context for localized, reactive state.
 * The editor state lives only within the DesignSystemEditorPage subtree.
 */

import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react'
import type { DesignSystemTokens, ColorRole } from './types'
import { getDefaultTokens } from './types'
import type { ColorTokens } from './types'

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export interface EditorState {
  tokens: DesignSystemTokens
  isDirty: boolean
  previewMode: 'light' | 'dark'
  editingMode: 'light' | 'dark'
  activeTab: 'colors' | 'typography' | 'other'
}

function getInitialState(initialTokens?: DesignSystemTokens): EditorState {
  return {
    tokens: initialTokens ?? getDefaultTokens(),
    isDirty: false,
    previewMode: 'light',
    editingMode: 'light',
    activeTab: 'colors',
  }
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export type EditorAction =
  | { type: 'SET_COLOR'; role: ColorRole; mode: 'light' | 'dark'; value: string }
  | { type: 'SET_FONT'; role: 'sans' | 'serif' | 'mono'; value: string }
  | { type: 'SET_RADIUS'; value: string }
  | { type: 'SET_SPACING'; value: 'compact' | 'comfortable' | 'spacious' }
  | { type: 'APPLY_PRESET'; preset: string; colors: { light: ColorTokens; dark: ColorTokens } }
  | { type: 'SET_PREVIEW_MODE'; mode: 'light' | 'dark' }
  | { type: 'SET_EDITING_MODE'; mode: 'light' | 'dark' }
  | { type: 'SET_ACTIVE_TAB'; tab: 'colors' | 'typography' | 'other' }
  | { type: 'MARK_SAVED' }
  | { type: 'LOAD_TOKENS'; tokens: DesignSystemTokens }

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'SET_COLOR':
      return {
        ...state,
        isDirty: true,
        tokens: {
          ...state.tokens,
          preset: 'custom',
          colors: {
            ...state.tokens.colors,
            [action.mode]: {
              ...state.tokens.colors[action.mode],
              [action.role]: action.value,
            },
          },
        },
      }

    case 'SET_FONT':
      return {
        ...state,
        isDirty: true,
        tokens: {
          ...state.tokens,
          typography: {
            ...state.tokens.typography,
            [action.role]: action.value,
          },
        },
      }

    case 'SET_RADIUS':
      return {
        ...state,
        isDirty: true,
        tokens: {
          ...state.tokens,
          radius: action.value,
        },
      }

    case 'SET_SPACING':
      return {
        ...state,
        isDirty: true,
        tokens: {
          ...state.tokens,
          spacing: action.value,
        },
      }

    case 'APPLY_PRESET':
      return {
        ...state,
        isDirty: true,
        tokens: {
          ...state.tokens,
          preset: action.preset,
          colors: action.colors,
        },
      }

    case 'SET_PREVIEW_MODE':
      return { ...state, previewMode: action.mode }

    case 'SET_EDITING_MODE':
      return { ...state, editingMode: action.mode }

    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.tab }

    case 'MARK_SAVED':
      return { ...state, isDirty: false }

    case 'LOAD_TOKENS':
      return {
        ...state,
        tokens: action.tokens,
        isDirty: false,
      }

    default:
      return state
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface EditorContextValue {
  state: EditorState
  dispatch: Dispatch<EditorAction>
}

const EditorContext = createContext<EditorContextValue | null>(null)

export function useEditor(): EditorContextValue {
  const ctx = useContext(EditorContext)
  if (!ctx) {
    throw new Error('useEditor must be used within an EditorProvider')
  }
  return ctx
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface EditorProviderProps {
  initialTokens?: DesignSystemTokens
  children: ReactNode
}

export function EditorProvider({ initialTokens, children }: EditorProviderProps) {
  const [state, dispatch] = useReducer(editorReducer, getInitialState(initialTokens))

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  )
}
