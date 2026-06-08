// src/App.jsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {
  auth, loginGoogle, logout, checkRedirectResult,
  loadUserData, saveVersion, saveProgress,
  addBookmark, removeBookmark, addHistory,
} from './firebase';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const BOOKS = [
  { id: 'gn',  name: 'Gênesis',          abbrev: 'Gn',  testament: 'AT' },
  { id: 'ex',  name: 'Êxodo',            abbrev: 'Êx',  testament: 'AT' },
  { id: 'lv',  name: 'Levítico',         abbrev: 'Lv',  testament: 'AT' },
  { id: 'nm',  name: 'Números',          abbrev: 'Nm',  testament: 'AT' },
  { id: 'dt',  name: 'Deuteronômio',     abbrev: 'Dt',  testament: 'AT' },
  { id: 'js',  name: 'Josué',            abbrev: 'Js',  testament: 'AT' },
  { id: 'jz',  name: 'Juízes',           abbrev: 'Jz',  testament: 'AT' },
  { id: 'rt',  name: 'Rute',             abbrev: 'Rt',  testament: 'AT' },
  { id: '1sm', name: '1 Samuel',         abbrev: '1Sm', testament: 'AT' },
  { id: '2sm', name: '2 Samuel',         abbrev: '2Sm', testament: 'AT' },
  { id: '1rs', name: '1 Reis',           abbrev: '1Rs', testament: 'AT' },
  { id: '2rs', name: '2 Reis',           abbrev: '2Rs', testament: 'AT' },
  { id: '1cr', name: '1 Crônicas',       abbrev: '1Cr', testament: 'AT' },
  { id: '2cr', name: '2 Crônicas',       abbrev: '2Cr', testament: 'AT' },
  { id: 'ed',  name: 'Esdras',           abbrev: 'Ed',  testament: 'AT' },
  { id: 'ne',  name: 'Neemias',          abbrev: 'Ne',  testament: 'AT' },
  { id: 'et',  name: 'Ester',            abbrev: 'Et',  testament: 'AT' },
  { id: 'jo',  name: 'Jó',              abbrev: 'Jó',  testament: 'AT' },
  { id: 'sl',  name: 'Salmos',           abbrev: 'Sl',  testament: 'AT' },
  { id: 'pv',  name: 'Provérbios',       abbrev: 'Pv',  testament: 'AT' },
  { id: 'ec',  name: 'Eclesiastes',      abbrev: 'Ec',  testament: 'AT' },
  { id: 'ct',  name: 'Cantares',         abbrev: 'Ct',  testament: 'AT' },
  { id: 'is',  name: 'Isaías',           abbrev: 'Is',  testament: 'AT' },
  { id: 'jr',  name: 'Jeremias',         abbrev: 'Jr',  testament: 'A
